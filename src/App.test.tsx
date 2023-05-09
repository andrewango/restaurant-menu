import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { HashRouter, MemoryRouter } from "react-router-dom";
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

describe("App", () => {
    test("renders Landing page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("landing-page")).toBeInTheDocument();
    });

    test("renders EditUsers page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/EditUsers"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("edit-users-page")).toBeInTheDocument();
    });

    test("renders EditFood page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/EditFood"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("edit-food-page")).toBeInTheDocument();
    });

    it("renders AboutUs page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/AboutUs"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("about-us-page")).toBeInTheDocument();
    });

    it("renders AddFood page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/AddFood"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("add-food-page")).toBeInTheDocument();
    });

    test("renders RemoveFood page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/RemoveFood"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("remove-food-page")).toBeInTheDocument();
    });

    test("renders OwnerLanding page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/OwnerLanding"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("owner-landing-page")).toBeInTheDocument();
    });

    test("renders ManageFoods page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/ManageFoods"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("manage-foods-page")).toBeInTheDocument();
    });

    test("renders UserStats page", () => {
        renderWithProviders(
            <MemoryRouter initialEntries={["/UserStats"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByTestId("user-stats-page")).toBeInTheDocument();
    });
});
