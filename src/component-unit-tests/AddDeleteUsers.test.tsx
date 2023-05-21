import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AddDeleteUsers from "../components/AddDeleteUsers";
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

describe("Add and Delete Users tests", () => {
    test("The Food searchbar is succesfully rendered", () => {
        render(<AddDeleteUsers></AddDeleteUsers>);
        const searchbarLabel = screen.getByPlaceholderText("Food name");
        expect(searchbarLabel).toBeInTheDocument();
    });
    test("The name input field is successfully rendered", () => {
        render(<AddDeleteUsers />);
        const nameInput = screen.getByPlaceholderText("Customer name");
        expect(nameInput).toBeInTheDocument();
    });
    test("The Add Customer button is successfully rendered", () => {
        render(<AddDeleteUsers />);
        const addButton = screen.getByText("Add Customer");
        expect(addButton).toBeInTheDocument();
    });
    test("Typing in the search bar works", () => {
        render(<AddDeleteUsers />);
        const searchInput = screen.getByPlaceholderText("Customer name");
        fireEvent.change(searchInput, { target: { value: "Gavin" } });
        expect(searchInput).toHaveValue("Gavin");
    });
    test("Can successfully add a user", () => {
        render(<AddDeleteUsers />);
        const searchInput = screen.getByPlaceholderText("Customer name");
        fireEvent.change(searchInput, { target: { value: "Gavin" } });
        const addButton = screen.getByText("Add Customer");
        fireEvent.click(addButton);
        expect(screen.queryByText(/Gavin/i)).toBeInTheDocument();
    });
    test("The increasing counter works", () => {
        render(<AddDeleteUsers />);
        expect(screen.queryByText(/2/i)).toBeInTheDocument();
    });
    test("Deleting works", () => {
        render(<AddDeleteUsers />);
        const deleteButton = screen.getAllByTestId("remove-customer");
        fireEvent.click(deleteButton[1]);
        expect(screen.queryByText(/Gavin/i)).not.toBeInTheDocument();
    });
});
