import React, { ReactElement, ReactNode } from "react";
import { render, fireEvent } from "@testing-library/react";
import AddNewFood from "../components/AddNewFood";
import { HashRouter } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMediaMock from "jest-matchmedia-mock";
export {};
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

afterEach(() => {
    sessionStorage.clear();
});

describe("AddNewFood tests", () => {
    test("Renders name form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Name/i)).toBeInTheDocument();
    });
    test("Renders image link form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Image Link/i)).toBeInTheDocument();
    });
    test("Renders description form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Description/i)).toBeInTheDocument();
    });
    test("Renders type form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Type/i)).toBeInTheDocument();
    });
    test("Renders ingredients form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Ingredients/i)).toBeInTheDocument();
    });
    test("Renders rating form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Rating/i)).toBeInTheDocument();
    });
    test("Renders price form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Price/i)).toBeInTheDocument();
    });
    test("Renders popular form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Popular/i)).toBeInTheDocument();
    });
    test("Renders spicy form", () => {
        const { getByLabelText } = renderWithProviders(<AddNewFood />);
        expect(getByLabelText(/Spicy/i)).toBeInTheDocument();
    });
    test("Renders add button", () => {
        const { getByRole } = renderWithProviders(<AddNewFood />);
        expect(getByRole("button", { name: /Add/i })).toBeInTheDocument();
    });
    test("Submits the form with the entered values", () => {
        const { getByLabelText, getByRole } = renderWithProviders(
            <AddNewFood />
        );
        fireEvent.change(getByLabelText(/Name/i), {
            target: { value: "New food" }
        });
        fireEvent.change(getByLabelText(/Image Link/i), {
            target: { value: "https://example.com/image.jpg" }
        });
        fireEvent.change(getByLabelText(/Description/i), {
            target: { value: "This is a new food." }
        });
        fireEvent.change(getByLabelText(/Type/i), {
            target: { value: "italian, pizza" }
        });
        fireEvent.change(getByLabelText(/Ingredients/i), {
            target: { value: "cheese, tomato, basil" }
        });
        fireEvent.change(getByLabelText(/Rating/i), { target: { value: "4" } });
        fireEvent.change(getByLabelText(/Price/i), {
            target: { value: "10.99" }
        });
        fireEvent.click(getByLabelText(/Popular/i));
        fireEvent.click(getByLabelText(/Spicy/i));
        fireEvent.submit(getByRole("button", { name: /Add/i }));
    });
    test("Items submitted are added to sessionStorage", () => {
        const { getByLabelText, getByRole } = renderWithProviders(
            <AddNewFood />
        );
        fireEvent.change(getByLabelText(/Name/i), {
            target: { value: "New food" }
        });
        fireEvent.change(getByLabelText(/Image Link/i), {
            target: { value: "https://example.com/image.jpg" }
        });
        fireEvent.change(getByLabelText(/Description/i), {
            target: { value: "This is a new food." }
        });
        fireEvent.change(getByLabelText(/Type/i), {
            target: { value: "italian, pizza" }
        });
        fireEvent.change(getByLabelText(/Ingredients/i), {
            target: { value: "cheese, tomato, basil" }
        });
        fireEvent.change(getByLabelText(/Rating/i), { target: { value: "4" } });
        fireEvent.change(getByLabelText(/Price/i), {
            target: { value: "10.99" }
        });
        fireEvent.click(getByLabelText(/Popular/i));
        fireEvent.click(getByLabelText(/Spicy/i));
        fireEvent.submit(getByRole("button", { name: /Add/i }));
        const menu = sessionStorage.getItem("menu");
        expect(menu).toContain("10.99"); // Nothing else is this price!
    });
});
