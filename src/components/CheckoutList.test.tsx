import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMediaMock from "jest-matchmedia-mock";
import CheckoutList from "./CheckoutList";
import { SearchBar } from "./SearchBar";

new MatchMediaMock();

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac"
    }
};

const theme = extendTheme({ colors });

export const renderWithProviders = (ui: ReactElement) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <HashRouter>
            <ChakraProvider theme={theme}>
                <DndProvider backend={HTML5Backend}>{children}</DndProvider>
            </ChakraProvider>
        </HashRouter>
    );

    return render(ui, { wrapper: Wrapper });
};

describe("CheckoutList tests", () => {
    test("The CheckoutList is succesfully rendered", () => {
        renderWithProviders(<CheckoutList></CheckoutList>);
        expect(screen.getByTestId("checkout-list")).toBeInTheDocument();
    });

    test("The customer is able to drag items into their checkout list", () => {
        renderWithProviders(
            <>
                <CheckoutList></CheckoutList>
                <SearchBar></SearchBar>
            </>
        );

        expect(screen.queryByText(/Pepperoni Pizza/i)).toBeInTheDocument();
        const foodItem = screen.getByTestId("Pepperoni Pizza");
        const checkoutList = screen.getByTestId("checkout-list");
        fireEvent.dragStart(foodItem);
        fireEvent.drop(checkoutList);
        expect(checkoutList).toHaveTextContent(/Pepperoni Pizza/i);

        const foodItemInCheckoutList = screen.getByTestId(
            "Pepperoni Pizza - Checkout Item"
        );
        const trash = screen.getByTestId("checkout-trash");
        fireEvent.dragStart(foodItemInCheckoutList);
        fireEvent.drop(trash);
    });

    test("The customer is able to delete items from their checkout list", () => {
        renderWithProviders(
            <>
                <CheckoutList></CheckoutList>
                <SearchBar></SearchBar>
            </>
        );
        // Drag the item to our checkout list
        expect(screen.queryByText(/Pepperoni Pizza/i)).toBeInTheDocument();
        const foodItem = screen.getByTestId("Pepperoni Pizza");
        const checkoutList = screen.getByTestId("checkout-list");
        fireEvent.dragStart(foodItem);
        fireEvent.drop(checkoutList);
        expect(checkoutList).toHaveTextContent(/Pepperoni Pizza/i);

        // Remove the item by dragging it to trash can
        const foodItemInCheckoutList = screen.getByTestId(
            "Pepperoni Pizza - Checkout Item"
        );
        const trash = screen.getByTestId("checkout-trash");
        fireEvent.dragStart(foodItemInCheckoutList);
        fireEvent.drop(trash);
        expect(checkoutList).not.toHaveTextContent(/Pepperoni Pizza/i);
    });
});
