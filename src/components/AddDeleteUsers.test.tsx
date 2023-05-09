import React from "react";
import { render, screen } from "@testing-library/react";
import AddDeleteUsers from "./AddDeleteUsers";
import { BrowserRouter } from "react-router-dom";
//import { SelectRole } from "./SelectRole";
//import userEvent from "@testing-library/user-event";

describe("AddDeleteUsers tests", () => {
    beforeEach(() => {
        sessionStorage.clear();
    });
    test("The page is succesfully rendered", () => {
        render(
            <BrowserRouter>
                <AddDeleteUsers />
            </BrowserRouter>
        );
        expect(screen.getByText(/Name:/i)).toBeInTheDocument();
        expect(screen.getByText(/Add Customer/i)).toBeInTheDocument();
    });
    /* We'll do this later! SessionStorage is impossible! :)
    test("Adding a customer updates SelectRole", () => {
        render(
            <BrowserRouter>
                <AddDeleteUsers />
            </BrowserRouter>
        );
        const textBox = screen.getByText(/Name:/i);
        userEvent.type(textBox, "Colby");
        fireEvent.click(screen.getByText("Add Customer"));
        const storage = sessionStorage.getItem("customers");
        console.log(storage);
        expect(storage).toContain("Colby");
        expect(screen.getByText(/Colby/i)).toBeInTheDocument();
    });
    */
});
