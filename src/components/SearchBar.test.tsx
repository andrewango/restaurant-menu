import React, { ReactElement, ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";
import { HashRouter } from "react-router-dom";
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

describe("SearchBar tests", () => {
    test("The Searchbar is succesfully rendered", () => {
        renderWithProviders(<SearchBar></SearchBar>);
        expect(screen.queryByText(/Search Menu/i)).toBeInTheDocument();
    });
});
