import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import EditFoodUI from "./EditFoodUI";
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
describe("EditFoodUI", () => {
    const mockFoodData = [
        {
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
            name: "Burger",
            image: "burger.jpg",
            desc: "Juicy burger",
            rating: 4.2,
            type: ["Fast food"],
            ingredients: ["Beef patty", "Lettuce", "Tomato"],
            popular: true,
            spicy: true,
            price: 8.99
        }
    ];
    test("Succesful component render", () => {
        renderWithProviders(<EditFoodUI foodData={mockFoodData} />);
        expect(screen.getAllByTestId("card")).not.toBeNull();
    });

    test("Renders proper amount of food items", () => {
        renderWithProviders(<EditFoodUI foodData={mockFoodData} />);
        const foodItems = screen.getAllByTestId("card");
        expect(foodItems.length).toBe(mockFoodData.length);
        const foodNames = mockFoodData.map((food) => food.name);
        foodNames.forEach((foodName, index) => {
            expect(foodItems[index]).toHaveTextContent(foodName);
        });
    });

    test("displays the correct border color when dragged", () => {
        renderWithProviders(<EditFoodUI foodData={mockFoodData} />);
        const foodItems = screen.getAllByTestId("card");
        // Simulate drag and check if border color changes
        foodItems.forEach(async (foodItem) => {
            foodItem.style.border = "0px"; // reset border style
            await waitFor(() => {
                fireEvent.dragEnd(foodItem);
                expect(foodItem.style.border).toBe("3px solid tomato");
            });
        });
    });
    test("renders correct food prices", () => {
        renderWithProviders(<EditFoodUI foodData={mockFoodData} />);
        const foodPrices = screen.getAllByText(/\$8\.99|\$10\.99/i);
        expect(foodPrices).toHaveLength(2);
    });

    test("renders popular and spicy badges", () => {
        renderWithProviders(<EditFoodUI foodData={mockFoodData} />);
        const foodBadges = screen.getAllByText(/popular|spicy/i);
        expect(foodBadges).toHaveLength(2);
    });
});
