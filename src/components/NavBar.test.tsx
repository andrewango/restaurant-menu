import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
import { SelectRole } from "./SelectRole";
import userEvent from "@testing-library/user-event";

describe("NavBar tests", () => {
    test("The bar is succesfully rendered", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByTestId("bar")).toBeInTheDocument();
    });
    test("about us button is displayed", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText(/about us/i)).toBeInTheDocument();
    });
    test("menu button is displayed", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.getByText(/menu/i)).toBeInTheDocument();
    });
    test("edit foods button is not displayed for user", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.queryByText(/edit food/i)).not.toBeInTheDocument();
    });
    test("edit users button is not displayed for user", () => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        expect(screen.queryByText(/edit users/i)).not.toBeInTheDocument();
    });
    test("manage users disapperas when admin is selected", async () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
        userEvent.selectOptions(screen.getByRole("combobox"), "Employee");
        expect(screen.getByText(/Employee/i)).toBeInTheDocument();
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.queryByText(/manage users/i)).not.toBeInTheDocument();
        });
    });
});
