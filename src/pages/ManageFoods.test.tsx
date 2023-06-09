import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import ManageFoods from "./ManageFoods";
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

describe("ManageFoods tests", () => {
    test("renders the 'Manage Food' heading", () => {
        renderWithProviders(<ManageFoods />);
        expect(screen.getByText("Manage Food")).toBeInTheDocument();
    });

    test("render add/remove button", () => {
        renderWithProviders(<ManageFoods></ManageFoods>);
        expect(screen.getByText("Add / Remove")).toBeInTheDocument();
    });

    test("clicking the 'Add / Remove' button navigates to the AddFood page", () => {
        renderWithProviders(<ManageFoods />);
        const addButton = screen.getByText("Add / Remove");
        addButton.click();
        expect(window.location.hash).toBe("#/AddRemoveFood");
    });

    test("render edit button", () => {
        renderWithProviders(<ManageFoods></ManageFoods>);
        expect(screen.getByText("Edit")).toBeInTheDocument();
    });

    test("clicking the 'edit' button navigates to the EditFood page", () => {
        renderWithProviders(<ManageFoods />);
        const addButton = screen.getByText("Edit");
        addButton.click();
        expect(window.location.hash).toBe("#/EditFood");
    });

    test("render Stats button", () => {
        renderWithProviders(<ManageFoods></ManageFoods>);
        expect(screen.getByText("Stats")).toBeInTheDocument();
    });

    test("clicking the 'Stats' button navigates to the UserStats page", () => {
        renderWithProviders(<ManageFoods />);
        const addButton = screen.getByText("Stats");
        addButton.click();
        expect(window.location.hash).toBe("#/UserStats");
    });
});
