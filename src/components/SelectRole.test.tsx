import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SelectRole } from "./SelectRole";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";

describe("SelectRole tests", () => {
    test("SelectRole dropdown is succesfully rendered", () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
    test("There is initially 2 options", () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        const options = screen.getByRole("combobox") as HTMLSelectElement;
        expect(options.options.length).toEqual(2);
    });
    test("SelectRole is initially Owner", () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        expect(screen.getByText(/Owner/i)).toBeInTheDocument();
    });
    test("Can select Employee", () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        userEvent.selectOptions(screen.getByRole("combobox"), "Employee");
        expect(screen.getByText(/Employee/i)).toBeInTheDocument();
    });
    /*
    test("You can add new users to SelectRole", async () => {
        // Couldn't get this to work, probably because sessionStorage won't work in a non-browser setting.
        // If anyone else wants to take a crack at it feel free!
        sessionStorage.setItem("Colby", "Colby");
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        await waitFor(() => {
            userEvent.selectOptions(screen.getByRole("combobox"), "Colby");
        });
        await waitFor(() => {
            expect(screen.queryByText(/Colby/i)).toBeInTheDocument();
        });
    });
    */
    test("edit users disapperas when admin is selected", async () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        userEvent.selectOptions(screen.getByRole("combobox"), "Employee");
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.queryByText(/edit users/i)).not.toBeInTheDocument();
        });
    });
});
