import React, { ReactElement, ReactNode } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChakraProvider, TabPanels, Tabs, extendTheme } from "@chakra-ui/react";
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
    editId: number;
} = {
    editName: "Marshmallow",
    editImage: "Marshmallows",
    editDesc: "Fluffy, sweet goodness.",
    editRating: 4,
    editType: ["Dessert"],
    editIngredients: ["Sugar, Corn Syrup, Water, Gelatin"],
    editPopular: true,
    editSpicy: false,
    editPrice: 2,
    editQuantity: 0,
    editId: 1
};

describe("EditFoodTabs tests", () => {
    test("Renders name form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Name/i)).toBeInTheDocument();
    });

    test("Renders image link form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Image Link/i)).toBeInTheDocument();
    });

    test("Renders description form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Description/i)).toBeInTheDocument();
    });

    test("Renders type form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Type/i)).toBeInTheDocument();
    });

    test("Renders ingredients form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Ingredients/i)).toBeInTheDocument();
    });

    test("Renders rating form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Rating/i)).toBeInTheDocument();
    });

    test("Renders price form", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Price/i)).toBeInTheDocument();
    });

    test("Renders popular checkbox", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Popular/i)).toBeInTheDocument();
    });

    test("Renders spicy checkbox", () => {
        const { getByLabelText } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByLabelText(/Spicy/i)).toBeInTheDocument();
    });

    test("Renders edit button", () => {
        const { getByRole } = renderWithProviders(
            <Tabs>
                <TabPanels>
                    <EditFoodTabs
                        {...args}
                        editType={args.editType}
                        editIngredients={args.editIngredients}
                    />
                </TabPanels>
            </Tabs>
        );
        expect(getByRole("button", { name: /Edit/i })).toBeInTheDocument();
    });

    test("Owner/Employee is able to drag and drop an item to create a new tab", () => {
        renderWithProviders(<EditFood></EditFood>);
        // Drag and drop food item to make new tab
        expect(
            screen.queryByText(/Black Licorice Ice Cream/i)
        ).toBeInTheDocument();
        const foodItem = screen.getByTestId("Black Licorice Ice Cream");
        const editFoodList = screen.getByTestId("edit-food-list");
        fireEvent.dragStart(foodItem);
        fireEvent.drop(editFoodList);
        expect(editFoodList).toHaveTextContent(/Black Licorice Ice Cream/i);
    });

    test("Owner/Employee is able to delete a tab", () => {
        renderWithProviders(<EditFood></EditFood>);
        // Drag and drop food item to make new tab
        expect(
            screen.queryByText(/Black Licorice Ice Cream/i)
        ).toBeInTheDocument();
        const foodItem = screen.getByTestId("Black Licorice Ice Cream");
        const editFoodList = screen.getByTestId("edit-food-list");
        fireEvent.dragStart(foodItem);
        fireEvent.drop(editFoodList);
        expect(editFoodList).toHaveTextContent(/Black Licorice Ice Cream/i);

        // Drag and drop tab to trash can to delete it
        const tab = screen
            .getByTestId("tab-select")
            .querySelector(".chakra-tabs__tab.css-vivaej");
        console.log(tab);
        const trash = screen.getByTestId("trash-icon");
        if (tab !== null) {
            fireEvent.dragStart(tab);
            fireEvent.drop(trash);
        }
        expect(editFoodList).not.toHaveTextContent(/Black Licorice Ice Cream/i);
    });

    test("Owner/Employee is able to switch tabs", async () => {
        renderWithProviders(<EditFood></EditFood>);
        // Drag and drop 2 food items to make 2 new tabs
        expect(
            screen.queryByText(/Black Licorice Ice Cream/i)
        ).toBeInTheDocument();
        expect(screen.queryByText(/Pepperoni Pizza/i)).toBeInTheDocument();
        const foodItem1 = screen.getByTestId("Black Licorice Ice Cream");
        const foodItem2 = screen.getByTestId("Pepperoni Pizza");
        const editFoodList = screen.getByTestId("edit-food-list");
        fireEvent.dragStart(foodItem1);
        fireEvent.drop(editFoodList);
        fireEvent.dragStart(foodItem2);
        fireEvent.drop(editFoodList);
        expect(editFoodList).toHaveTextContent(/Black Licorice Ice Cream/i);
        expect(editFoodList).toHaveTextContent(/Pepperoni Pizza/i);
        // Make sure we're on the first tab
        const tab1 = screen
            .getByTestId("tab-select")
            .querySelector("#tabs-\\:r13\\:--tab-0");
        if (tab1 !== null) {
            expect(tab1.getAttribute("aria-selected")).toBe("true");
        }

        // Switching tabs
        const tab2 = screen
            .getByTestId("tab-select")
            .querySelector("#tabs-\\:r13\\:--tab-1");
        console.log(tab2);
        if (tab2 !== null) {
            fireEvent.click(tab2);
            expect(tab2.getAttribute("aria-selected")).toBe("true");
        }

        if (tab1 !== null) {
            fireEvent.click(tab1);
            expect(tab1.getAttribute("aria-selected")).toBe("true");
        }
    });

    test("Edit button is disabled at first and enabled after user changes one or more fields", () => {
        renderWithProviders(<EditFood />);
        // Drag and drop food item to make new tab
        expect(
            screen.queryByText(/Black Licorice Ice Cream/i)
        ).toBeInTheDocument();
        const foodItem = screen.getByTestId("Black Licorice Ice Cream");
        const editFoodList = screen.getByTestId("edit-food-list");
        fireEvent.dragStart(foodItem);
        fireEvent.drop(editFoodList);
        expect(editFoodList).toHaveTextContent(/Black Licorice Ice Cream/i);

        const editButton = screen.getByTestId("edit-submit");
        expect(editButton).toBeDisabled();

        fireEvent.change(screen.getByTestId("edit-name-form"), {
            target: { value: args.editName }
        });
        fireEvent.change(screen.getByTestId("edit-image-form"), {
            target: { value: args.editImage }
        });
        fireEvent.change(screen.getByTestId("edit-desc-form"), {
            target: { value: args.editDesc }
        });
        fireEvent.change(screen.getByTestId("edit-type-form"), {
            target: { value: args.editType }
        });
        fireEvent.change(screen.getByTestId("edit-ingredients-form"), {
            target: { value: args.editIngredients }
        });
        fireEvent.change(screen.getByTestId("edit-rating-form"), {
            target: { value: args.editRating }
        });
        fireEvent.change(screen.getByTestId("edit-price-form"), {
            target: { value: args.editPrice }
        });
        fireEvent.click(screen.getByTestId("edit-popular-checkbox"));
        expect(editButton).not.toBeDisabled();
    });

    test("Items submitted are added to sessionStorage", () => {
        renderWithProviders(<EditFood></EditFood>);
        // Drag and drop food item to make new tab
        expect(
            screen.queryByText(/Black Licorice Ice Cream/i)
        ).toBeInTheDocument();
        const foodItem = screen.getByTestId("Black Licorice Ice Cream");
        const editFoodList = screen.getByTestId("edit-food-list");
        fireEvent.dragStart(foodItem);
        fireEvent.drop(editFoodList);
        expect(editFoodList).toHaveTextContent(/Black Licorice Ice Cream/i);

        // Type into the forms
        fireEvent.change(screen.getByTestId("edit-name-form"), {
            target: { value: args.editName }
        });
        fireEvent.change(screen.getByTestId("edit-image-form"), {
            target: { value: args.editImage }
        });
        fireEvent.change(screen.getByTestId("edit-desc-form"), {
            target: { value: args.editDesc }
        });
        fireEvent.change(screen.getByTestId("edit-type-form"), {
            target: { value: args.editType }
        });
        fireEvent.change(screen.getByTestId("edit-ingredients-form"), {
            target: { value: args.editIngredients }
        });
        fireEvent.change(screen.getByTestId("edit-rating-form"), {
            target: { value: args.editRating }
        });
        fireEvent.change(screen.getByTestId("edit-price-form"), {
            target: { value: args.editPrice }
        });
        fireEvent.click(screen.getByTestId("edit-popular-checkbox"));

        // Submit the form
        fireEvent.submit(screen.getByTestId("edit-food-form"));

        // Check if SessionStorage updated
        const menuInSessionStorage = sessionStorage.getItem("menu");
        const editFoodListInSessionStorage =
            sessionStorage.getItem("editFoodList");
        expect(menuInSessionStorage).toContain("2"); // Nothing else is this price!
        expect(menuInSessionStorage).toContain("Marshmallows"); // Nothing else is this name!
        expect(editFoodListInSessionStorage).toContain("2"); // Nothing else is this price!
        expect(editFoodListInSessionStorage).toContain("Marshmallows"); // Nothing else is this name!
    });
});
