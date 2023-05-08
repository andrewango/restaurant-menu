import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AddDeleteUsers from "./AddDeleteUsers";
import { BrowserRouter } from "react-router-dom";
import { SelectRole } from "./SelectRole";
import userEvent from "@testing-library/user-event";

describe("NavBar tests", () => {
    test("The page is succesfully rendered", () => {
        render(
            <BrowserRouter>
                <AddDeleteUsers />
            </BrowserRouter>
        );
        expect(screen.getByRole("textbox")).toBeInTheDocument();
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText(/Add Customer/i)).toBeInTheDocument();
    });
    test("Adding a customer updates SelectRole", () => {
        render(
            <BrowserRouter>
                <AddDeleteUsers />
                <SelectRole />
            </BrowserRouter>
        );
        const textBox = screen.getByRole("textbox");
        userEvent.type(textBox, "Colby");
        screen.getByRole("button").click();
        render(
            <BrowserRouter>
                <SelectRole />
            </BrowserRouter>
        );
        expect(screen.getByText(/Colby/i)).toBeInTheDocument();
    });
});
