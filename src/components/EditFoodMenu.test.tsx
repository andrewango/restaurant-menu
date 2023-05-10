import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { EditFoodMenu } from "./EditFoodMenu";
import { HashRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMediaMock from "jest-matchmedia-mock";

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

describe("SearchBar tests", () => {
    test("The Searchbar is succesfully rendered", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        expect(screen.getByTestId("editfoodmenu")).toBeInTheDocument();
    });

    test("The customer is able to type in the searchbar and it updates values", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const searchInput = screen.getByTestId("search-input");
        fireEvent.change(searchInput, { target: { value: "Pepperoni Pizza" } });
        expect(searchInput).toHaveValue("Pepperoni Pizza");
    });

    test("Typing in the searchbar filters the menu list", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const searchInput = screen.getByLabelText("Search Menu");
        fireEvent.change(searchInput, { target: { value: "Cheeseburger" } });
        expect(searchInput).toHaveValue("Cheeseburger");
        expect(screen.queryByText(/Cheeseburger/i)).toBeInTheDocument();
        expect(screen.queryByText(/Pepperoni Pizza/i)).not.toBeInTheDocument();
    });

    test("Clicking on a Spicy tag filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const spicyFilter = screen.getByTestId("spicy-filter-button");
        fireEvent.click(spicyFilter);
        expect(spicyFilter).toHaveStyle("backgroundColor: rgb(245, 101, 101");
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("Spicy Salmon Avocado Sushi");
        expect(grid.lastChild).toHaveTextContent("Koshari");
    });

    test("Clicking on a Popular tag filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const popularFilter = screen.getByTestId("popular-filter-button");
        fireEvent.click(popularFilter);
        expect(popularFilter).toHaveStyle("backgroundColor: rgb(245, 101, 101");
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("Pepperoni Pizza");
        expect(grid.lastChild).toHaveTextContent("Flan");
    });

    test("Clicking on an Appetizer tag filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const appetizerFilter = screen.getByTestId("appetizer-filter-button");
        fireEvent.click(appetizerFilter);
        expect(appetizerFilter).toHaveStyle(
            "backgroundColor: rgb(245, 101, 101"
        );
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("House Salad");
        expect(grid.lastChild).toHaveTextContent("Colcannon Puffs");
    });

    test("Clicking on an Entree tag filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const entreeFilter = screen.getByTestId("entree-filter-button");
        fireEvent.click(entreeFilter);
        expect(entreeFilter).toHaveStyle("backgroundColor: rgb(245, 101, 101");
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("Pepperoni Pizza");
        expect(grid.lastChild).toHaveTextContent("Koshari");
    });

    test("Clicking on a Dessert tag filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const dessertFilter = screen.getByTestId("dessert-filter-button");
        fireEvent.click(dessertFilter);
        expect(dessertFilter).toHaveStyle("backgroundColor: rgb(245, 101, 101");
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("Tiramisu");
        expect(grid.lastChild).toHaveTextContent("Flan");
    });

    test("Clicking on a Sort by High To Low Price radio button filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const sortPriceFilter = screen.getByTestId(
            "pricehightolow-filter-button"
        );
        fireEvent.click(sortPriceFilter);
        expect(sortPriceFilter).toHaveStyle(
            "backgroundColor: rgb(245, 101, 101"
        );
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("Paella");
        expect(grid.lastChild).toHaveTextContent("House Salad");
    });

    test("Clicking on a Sort by Low To High Price radio button filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const sortPriceFilter = screen.getByTestId(
            "pricelowtohigh-filter-button"
        );
        fireEvent.click(sortPriceFilter);
        expect(sortPriceFilter).toHaveStyle(
            "backgroundColor: rgb(245, 101, 101"
        );
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("House Salad");
        expect(grid.lastChild).toHaveTextContent("Paella");
    });

    test("Clicking on a Sort by Rating radio button filters the menu list correctly", () => {
        renderWithProviders(<EditFoodMenu></EditFoodMenu>);
        const sortRatingFilter = screen.getByTestId("rating-filter-button");
        fireEvent.click(sortRatingFilter);
        expect(sortRatingFilter).toHaveStyle(
            "backgroundColor: rgb(245, 101, 101"
        );
        const grid = screen.getByTestId("edit-menu");
        expect(grid.firstChild).toHaveTextContent("Tacos al Pastor");
        expect(grid.lastChild).toHaveTextContent("Hákarl");
    });
});
