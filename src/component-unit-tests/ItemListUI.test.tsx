import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import ItemListUI from "../components/ItemListUI";
import MatchMediaMock from "jest-matchmedia-mock";
import { HashRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";

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

describe("ItemListUI Tests", () => {
    const foodData = [
        {
            quantity: 1,
            name: "Pizza",
            image: "pizza.jpg",
            desc: "A delicious pizza",
            rating: 4.5,
            type: ["Italian"],
            ingredients: ["Tomato sauce", "Cheese", "Pepperoni"],
            popular: true,
            spicy: false,
            price: 10.99
        },
        {
            quantity: 1,
            name: "Burger",
            image: "burger.jpg",
            desc: "A tasty burger",
            rating: 4.2,
            type: ["American"],
            ingredients: ["Beef patty", "Cheese", "Lettuce", "Tomato"],
            popular: false,
            spicy: true,
            price: 8.99
        }
    ];

    test("Renders menu", () => {
        renderWithProviders(<ItemListUI foodData={foodData} />);
        const foodItems = screen.getAllByTestId("menu");
        expect(foodItems).not.toBeNull();
    });

    test("Renders a box with a scrollbar", () => {
        renderWithProviders(<ItemListUI foodData={foodData} />);
        const box = screen.getByTestId("item-list-box");
        expect(box).toHaveStyle({ overflowY: "scroll" });
    });

    test("Maps each food in the list to a food item component", () => {
        renderWithProviders(<ItemListUI foodData={foodData} />);
        const foodItems = screen.getAllByTestId("food-item");
        expect(foodItems[0]).toHaveTextContent("Pizza");
        expect(foodItems[1]).toHaveTextContent("Burger");
    });

    test("Applies the correct template columns based on media query", () => {
        renderWithProviders(<ItemListUI foodData={foodData} />);
        expect(screen.getByTestId("menu")).toHaveStyle({
            gridTemplateColumns: "repeat(1, 1fr)"
        });
    });

    test("Render correct number of food based on menu size", () => {
        renderWithProviders(<ItemListUI foodData={foodData} />);
        const foodItems = screen.getAllByTestId("food-item");
        expect(foodItems.length).toEqual(2);
    });
});
