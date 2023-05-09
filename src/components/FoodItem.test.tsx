import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render } from "@testing-library/react";
import FoodItem from "./FoodItem";
import { HashRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMediaMock from "jest-matchmedia-mock";
import { userProps } from "../interfaces/User";

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

describe("FoodItem component", () => {
    const testFoodItem = {
        name: "testFood",
        image: "testImage",
        desc: "testDescription",
        ingredients: ["testIngredient1", "testIngredient2"],
        price: 10,
        rating: 3
    };
    const testUser: userProps = {
        name: "testUser",
        orderID: 2,
        role: "Customer",
        order: []
    };
    sessionStorage.setItem("customers", JSON.stringify([testUser]));

    test("renders the food item with correct props", () => {
        const { getByText } = renderWithProviders(
            <FoodItem {...testFoodItem} />
        );
        expect(getByText(testFoodItem.name)).toBeInTheDocument();
        expect(getByText(testFoodItem.desc)).toBeInTheDocument();
        expect(getByText(`$${testFoodItem.price}`)).toBeInTheDocument();
        expect(
            getByText(`Ingredients: ${testFoodItem.ingredients.join(", ")}`)
        ).toBeInTheDocument();
    });

    test("changes the border of the card when dragged", () => {
        const { getByRole } = renderWithProviders(
            <FoodItem {...testFoodItem} />
        );
        const card = getByRole("card");
        expect(card.style.border).toBe("0px");
        fireEvent.drag(card);
        expect(card.style.border).toBe("3px solid tomato");
    });

    test("shows the correct number of filled stars for the rating", () => {
        const { getAllByTestId } = renderWithProviders(
            <FoodItem {...testFoodItem} />
        );
        const starIcons = getAllByTestId("star-icon");
        expect(starIcons.length).toBe(5);
        expect(starIcons[0].style.color).toBe("#FFDD00");
        expect(starIcons[1].style.color).toBe("#FFDD00");
        expect(starIcons[2].style.color).toBe("#FFDD00");
        expect(starIcons[3].style.color).toBe("transparent");
        expect(starIcons[4].style.color).toBe("transparent");
    });
});
