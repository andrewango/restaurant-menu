import React from "react";
import { render } from "@testing-library/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FoodItem from "./FoodItem";

describe("FoodItem tests", () => {
    render(
        <DndProvider backend={HTML5Backend}>
            <FoodItem
                name="test"
                image="test.jpg"
                desc="test desc"
                ingredients={["ing1", "ing2"]}
                price={5}
                rating={2}
            />
        </DndProvider>
    );

    test("displays the correct food name", () => {
        const name = "test name";
        const { getByText } = render(
            <DndProvider backend={HTML5Backend}>
                <FoodItem
                    name={name}
                    image="test.jpg"
                    desc="test desc"
                    ingredients={["ing1", "ing2"]}
                    price={10}
                    rating={3}
                />
            </DndProvider>
        );
        expect(getByText(name)).toBeInTheDocument();
    });

    test("displays the correct description", () => {
        const desc = "test desc";
        const { getByText } = render(
            <DndProvider backend={HTML5Backend}>
                <FoodItem
                    name="test"
                    image={desc}
                    desc="test desc"
                    ingredients={["ing1", "ing2"]}
                    price={10}
                    rating={3}
                />
            </DndProvider>
        );
        expect(getByText(desc)).toBeInTheDocument;
    });

    test("displays the correct ingredients", () => {
        const ingredients = ["ing1", "ing2"];
        const { getByText } = render(
            <DndProvider backend={HTML5Backend}>
                <FoodItem
                    name="test"
                    image="test.jpg"
                    desc="test desc"
                    ingredients={ingredients}
                    price={10}
                    rating={3}
                />
            </DndProvider>
        );
        /* expect(getByText(ingredients)).toBeInTheDocument; */
    });
});
