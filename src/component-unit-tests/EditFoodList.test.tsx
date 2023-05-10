import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import EditFoodList from "../components/EditFoodList";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
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

const mockFoodData = [
    {
        quantity: 1,
        name: "Pizza",
        image: "pizza.jpg",
        desc: "Delicious pizza",
        rating: 4.5,
        type: ["Italian", "Fast food"],
        ingredients: ["Tomato sauce", "Cheese", "Pepperoni"],
        popular: true,
        spicy: false,
        price: 10.99
    }
];

const mockFoodData2 = [
    {
        quantity: 1,
        name: "Pizza",
        image: "pizza.jpg",
        desc: "Delicious pizza",
        rating: 4.5,
        type: ["Italian", "Fast food"],
        ingredients: ["Tomato sauce", "Cheese", "Pepperoni"],
        popular: true,
        spicy: false,
        price: 10.99
    },
    {
        quantity: 1,
        name: "Burger",
        image: "burger.jpg",
        desc: "Delicious burger",
        rating: 4.5,
        type: ["American", "Fast food"],
        ingredients: ["Meat", "Cheese", "Bun"],
        popular: true,
        spicy: false,
        price: 10.99
    }
];

afterEach(() => {
    sessionStorage.clear();
});
describe("EditFoodList Tests", () => {
    test("Renders Edit Food header", () => {
        renderWithProviders(<EditFoodList />);
        const headerElement = screen.getByText(/Edit Food/i);
        expect(headerElement).toBeInTheDocument();
    });

    test("Renders Trash", () => {
        renderWithProviders(<EditFoodList />);
        const trashIconElement = screen.getByTestId("trash-icon");
        expect(trashIconElement).toBeInTheDocument();
    });

    test("Items can be added to edit list", () => {
        sessionStorage.setItem("editFoodList", JSON.stringify(mockFoodData));
        renderWithProviders(<EditFoodList />);
        const pizza = screen.getByText(/Pizza/i);
        expect(pizza).toBeInTheDocument();
    });
    test("There are multiple tabs, 1 per item", () => {
        sessionStorage.setItem("editFoodList", JSON.stringify(mockFoodData2));
        renderWithProviders(<EditFoodList />);
        expect(screen.getByText("Pizza")).toBeInTheDocument();
        expect(screen.getByText("Burger")).toBeInTheDocument();
    });
    test("Items removed from sessionStorage are removed from list", () => {
        sessionStorage.setItem("editFoodList", JSON.stringify(mockFoodData));
        sessionStorage.removeItem("editFoodList");
        renderWithProviders(<EditFoodList />);
        expect(screen.queryByText("Pizza")).not.toBeInTheDocument();
    });
});
