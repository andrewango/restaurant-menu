import React from "react";
import { render, screen } from "@testing-library/react";
import { DeliveryDropDown } from "../components/DeliveryDropDown";
import userEvent from "@testing-library/user-event";

describe("DeliveryDropdown tests", () => {
    test("The dropdown is succesfully rendered", () => {
        render(<DeliveryDropDown />);
        expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
    test("The initial time is 12", () => {
        render(<DeliveryDropDown />);
        expect(screen.getByText(/12:00/i)).toBeInTheDocument();
    });
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
});
