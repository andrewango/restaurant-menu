import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMediaMock from "jest-matchmedia-mock";
import EditFoodTabs from "./EditFoodTabs";

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
describe("Edit Food Tab tests", () => {
    test("Succesful component render", () => {
        renderWithProviders(
            <EditFoodTabs
                editName=""
                editDesc=""
                editImage=""
                editIngredients={[]}
                editPopular
                editPrice={0}
                editQuantity={0}
                editRating={0}
                editSpicy
                editType={[]}
            />
        );
        expect(screen.getAllByTestId("card")).not.toBeNull();
    });
});
