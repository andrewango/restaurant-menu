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
        expect(screen.getByTestId("combobox")).toBeInTheDocument();
    });
    test("edit users disapperas when admin is selected", async () => {
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        userEvent.selectOptions(screen.getByRole("combobox"), "Employee");
        expect(screen.getByText(/Employee/i)).toBeInTheDocument();
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
