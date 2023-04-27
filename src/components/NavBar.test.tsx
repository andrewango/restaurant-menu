import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter } from "react-router-dom";
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
    /*
    test("Clicking 3 changes time to 3", () => {
        render(<DeliveryDropDown />);
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "3:00");
        expect(screen.getByText(/3:00/i)).toBeInTheDocument();
    });
    test("Clicking 9 changes time to 9", () => {
        render(<DeliveryDropDown />);
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "9:00");
        expect(screen.getByText(/9:00/i)).toBeInTheDocument();
    });
    test("Clicking 5 changes time to 5", () => {
        render(<DeliveryDropDown />);
        const select = screen.getByRole("combobox");
        userEvent.selectOptions(select, "5:00");
        expect(screen.getByText(/5:00/i)).toBeInTheDocument();
    });
    */
});
