import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import AddDeleteUsers from "./AddDeleteUsers";
import { BrowserRouter } from "react-router-dom";
import { SelectRole } from "./SelectRole";
import userEvent from "@testing-library/user-event";

describe("AddDeleteUsers tests", () => {
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
        const sessionStorageMock = {
            getItem: jest.fn(),
            setItem: jest.fn(),
            clear: jest.fn()
        };

        // Replace the real sessionStorage with the mock version
        Object.defineProperty(window, "sessionStorage", {
            value: sessionStorageMock
        });

        render(
            <BrowserRouter>
                <AddDeleteUsers />
            </BrowserRouter>
        );
        const textBox = screen.getByRole("textbox");
        userEvent.type(textBox, "Colby");
        screen.getByText(/Add Customer/i).click();

        expect(sessionStorageMock.setItem).toHaveBeenCalledWith(
            "customers",
            JSON.stringify(["Colby"])
        );
    });
});
