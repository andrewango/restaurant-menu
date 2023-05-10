import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RemoveFood from "../components/RemoveFood";
import { BrowserRouter } from "react-router-dom";
import MatchMediaMock from "jest-matchmedia-mock";

new MatchMediaMock();
sessionStorage.clear();
const mockMenu = [
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
sessionStorage.setItem("menu", JSON.stringify(mockMenu));
describe("RemoveFood Tests", () => {
    test("Renders the RemoveFood component", () => {
        render(
            <BrowserRouter>
                <RemoveFood />
            </BrowserRouter>
        );
        const removeFoodPage = screen.getByTestId("remove-food-page");
        expect(removeFoodPage).toBeInTheDocument();
    });

    test("Displays food name and image", () => {
        render(
            <BrowserRouter>
                <RemoveFood />
            </BrowserRouter>
        );
        const foodName = screen.getByText("Pizza");
        const foodImage = screen.getByAltText("Pizza");
        expect(foodName).toBeInTheDocument();
        expect(foodImage).toBeInTheDocument();
    });

    test("Displays food type and ingredients", () => {
        render(
            <BrowserRouter>
                <RemoveFood />
            </BrowserRouter>
        );
        const foodType = screen.getByText(/Type:/);
        const foodIngredients = screen.getByText(/Ingredients:/);
        expect(foodType).toBeInTheDocument();
        expect(foodIngredients).toBeInTheDocument();
    });

    test("Displays food rating and price", () => {
        render(
            <BrowserRouter>
                <RemoveFood />
            </BrowserRouter>
        );
        const foodRating = screen.getByText(/Rating:/);
        const foodPrice = screen.getByText(/Price:/);
        expect(foodRating).toBeInTheDocument();
        expect(foodPrice).toBeInTheDocument();
    });

    test("Removes a food item when remove button is clicked", () => {
        render(
            <BrowserRouter>
                <RemoveFood />
            </BrowserRouter>
        );
        const removeButton = screen.getByText("remove");
        fireEvent.click(removeButton);
        const removedItem = screen.queryByText("Pizza");
        expect(removedItem).toBeNull();
    });
});
