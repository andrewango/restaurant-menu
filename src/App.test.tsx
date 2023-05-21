import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
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

export const renderWithProviders = (ui: ReactElement, page: string) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <MemoryRouter initialEntries={[page]}>
            <ChakraProvider theme={theme}>
                <DndProvider backend={HTML5Backend}>{children}</DndProvider>
            </ChakraProvider>
        </MemoryRouter>
    );

    return render(ui, { wrapper: Wrapper });
};

describe("App", () => {
    test("renders Landing page", () => {
        renderWithProviders(<App />, "/");
        expect(screen.getByTestId("landing-page")).toBeInTheDocument();
    });

    test("renders EditUsers page", () => {
        renderWithProviders(<App />, "/EditUsers");
        expect(screen.getByTestId("edit-users-page")).toBeInTheDocument();
    });

    test("renders AboutUs page", () => {
        renderWithProviders(<App />, "/AboutUs");
        expect(screen.getByTestId("about-us-page")).toBeInTheDocument();
    });

    test("renders AddFood page", () => {
        renderWithProviders(<App />, "/AddRemoveFood");
        expect(screen.getByTestId("add-food-page")).toBeInTheDocument();
    });

    test("renders OwnerLanding page", () => {
        renderWithProviders(<App />, "/OwnerLanding");
        expect(screen.getByTestId("owner-landing-page")).toBeInTheDocument();
    });

    test("renders ManageFoods page", () => {
        renderWithProviders(<App />, "/ManageFoods");
        expect(screen.getByTestId("manage-foods-page")).toBeInTheDocument();
    });
});
