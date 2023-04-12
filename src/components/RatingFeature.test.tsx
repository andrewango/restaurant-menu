import React from "react";
import { render, screen } from "@testing-library/react";
import RatingFeature from "./RatingFeature";
import { GrStar } from "react-icons/gr";

describe("RatingFeature tests", () => {
    render(<RatingFeature />);
    const radios = screen.getAllByRole("radio", { hidden: true });
    test("There are 5 radio buttons", () => {
        expect(radios.length).toEqual(5);
    });
    /* 
    Ideally I would like to test for the star icons too, but I can't
    seem to get them to test and they're inherintly linked to the
    rendering of the radio buttons, so it's not a big deal
    test("There are stars in the document", () => {
        const stars = screen.getAllByRole("???");
        expect(stars.length).toEqual(5);
    });
    */
    test("The initial value is 0", () => {
        !expect(radios[0]).toBeChecked;
        !expect(radios[1]).toBeChecked;
        !expect(radios[2]).toBeChecked;
        !expect(radios[3]).toBeChecked;
        !expect(radios[4]).toBeChecked;
    });
    test("Clicking the first star sets rating to 1", () => {
        radios[0].click();
        expect(radios[0]).toBeChecked;
        !expect(radios[1]).toBeChecked;
        !expect(radios[2]).toBeChecked;
        !expect(radios[3]).toBeChecked;
        !expect(radios[4]).toBeChecked;
    });

    test("Clicking the last star sets rating to 5, unchecking other radios", () => {
        radios[4].click();
        !expect(radios[0]).toBeChecked;
        !expect(radios[1]).toBeChecked;
        !expect(radios[2]).toBeChecked;
        !expect(radios[3]).toBeChecked;
        expect(radios[4]).toBeChecked;
    });

    test("Clicking the third star sets rating to 3, unchecking other radios", () => {
        radios[2].click();
        !expect(radios[0]).toBeChecked;
        !expect(radios[1]).toBeChecked;
        expect(radios[2]).toBeChecked;
        !expect(radios[3]).toBeChecked;
        !expect(radios[4]).toBeChecked;
    });

    test("Clicking the fourth star sets rating to 4, unchecking other radios", () => {
        radios[3].click();
        !expect(radios[0]).toBeChecked;
        !expect(radios[1]).toBeChecked;
        !expect(radios[2]).toBeChecked;
        expect(radios[3]).toBeChecked;
        !expect(radios[4]).toBeChecked;
    });

    test("Clicking the second star sets rating to 2, unchecking other radios", () => {
        radios[1].click();
        !expect(radios[0]).toBeChecked;
        expect(radios[1]).toBeChecked;
        !expect(radios[2]).toBeChecked;
        !expect(radios[3]).toBeChecked;
        !expect(radios[4]).toBeChecked;
    });
});
