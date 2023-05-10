import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render } from "@testing-library/react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HashRouter } from "react-router-dom";
import { HTML5Backend } from "react-dnd-html5-backend";
import MatchMediaMock from "jest-matchmedia-mock";
import EditFoodTabs from "../components/EditFoodTabs";
import EditFood from "../pages/EditFood";

new MatchMediaMock();

const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac"
    }
};

const theme = extendTheme({ colors });

export const renderWithProviders = (ui: ReactElement) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <HashRouter>
            <ChakraProvider theme={theme}>
                <DndProvider backend={HTML5Backend}>{children}</DndProvider>
            </ChakraProvider>
        </HashRouter>
    );

    return render(ui, { wrapper: Wrapper });
};

afterEach(() => {
    sessionStorage.clear();
});

const args: {
    editName: string;
    editImage: string;
    editDesc: string;
    editRating: number;
    editType: string[];
    editIngredients: string[];
    editPopular: boolean;
    editSpicy: boolean;
    editPrice: number;
    editQuantity: number;
} = {
    editName: "Marshmallow",
    editImage: "Marshmallows",
    editDesc: "Fluffy, sweet goodness.",
    editRating: 4,
    editType: ["Dessert"],
    editIngredients: ["Sugar, Corn Syrup, Water, Gelatin"],
    editPopular: true,
    editSpicy: false,
    editPrice: 3,
    editQuantity: 0
};

describe("EditFoodTabs tests", () => {
    test("Renders name form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Name/i)).toBeInTheDocument();
    });

    test("Renders image link form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Image Link/i)).toBeInTheDocument();
    });

    test("Renders description form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Description/i)).toBeInTheDocument();
    });

    test("Renders type form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Type/i)).toBeInTheDocument();
    });

    test("Renders ingredients form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Ingredients/i)).toBeInTheDocument();
    });

    test("Renders rating form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Rating/i)).toBeInTheDocument();
    });

    test("Renders price form", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Price/i)).toBeInTheDocument();
    });

    test("Renders popular checkbox", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Popular/i)).toBeInTheDocument();
    });

    test("Renders spicy checkbox", () => {
        const { getByLabelText } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByLabelText(/Spicy/i)).toBeInTheDocument();
    });

    test("Renders edit button", () => {
        const { getByRole } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        expect(getByRole("button", { name: /Edit/i })).toBeInTheDocument();
    });

    test("Submits the form with the entered values", () => {
        const { getByLabelText, getByRole } = renderWithProviders(
            <EditFoodTabs
                {...args}
                editType={args.editType}
                editIngredients={args.editIngredients}
            />
        );
        fireEvent.change(getByLabelText(/Name/i), {
            target: { value: "New food" }
        });
        fireEvent.change(getByLabelText(/Image Link/i), {
            target: { value: "https://example.com/image.jpg" }
        });
        fireEvent.change(getByLabelText(/Description/i), {
            target: { value: "This is a new food." }
        });
        fireEvent.change(getByLabelText(/Type/i), {
            target: { value: "italian, pizza" }
        });
        fireEvent.change(getByLabelText(/Ingredients/i), {
            target: { value: "cheese, tomato, basil" }
        });
        fireEvent.change(getByLabelText(/Rating/i), { target: { value: "4" } });
        fireEvent.change(getByLabelText(/Price/i), {
            target: { value: "10.99" }
        });
        fireEvent.click(getByLabelText(/Popular/i));
        fireEvent.click(getByLabelText(/Spicy/i));
        fireEvent.submit(getByRole("button", { name: /Edit/i }));
    });

    test("Items submitted are added to sessionStorage", () => {
        const { getByLabelText, getByRole } = renderWithProviders(<EditFood />);
        fireEvent.change(getByLabelText(/Name/i), {
            target: { value: args.editName }
        });
        fireEvent.change(getByLabelText(/Image Link/i), {
            target: { value: args.editImage }
        });
        fireEvent.change(getByLabelText(/Description/i), {
            target: { value: args.editDesc }
        });
        fireEvent.change(getByLabelText(/Type/i), {
            target: { value: args.editType }
        });
        fireEvent.change(getByLabelText(/Ingredients/i), {
            target: { value: args.editIngredients }
        });
        fireEvent.change(getByLabelText(/Rating/i), {
            target: { value: args.editRating }
        });
        fireEvent.change(getByLabelText(/Price/i), {
            target: { value: args.editPrice }
        });
        fireEvent.click(getByLabelText(/Popular/i));
        fireEvent.submit(getByRole("button", { name: /Edit/i }));
        const menu = sessionStorage.getItem("menu");
        const editFoodList = sessionStorage.getItem("editFoodList");
        expect(menu).toContain("2"); // Nothing else is this price!
        expect(editFoodList).toContain("2"); // Nothing else is this price!
    });
});
