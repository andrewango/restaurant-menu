import React from "react";
import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("NavBar tests", () => {
    test("The Searchbar is succesfully rendered", () => {
        render(<SearchBar></SearchBar>);
        expect(screen.getByRole("searchbar")).toBeInTheDocument();
    });
});
