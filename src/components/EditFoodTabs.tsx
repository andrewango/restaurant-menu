import React, { useState } from "react";
import {
    TabPanel,
    FormControl,
    SimpleGrid,
    Button,
    GridItem,
    FormLabel,
    Input,
    Checkbox
} from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import { EditMenuList } from "./EditFoodList";
import { MenuList } from "./AddNewFood";
import "./EditFoodStyles.css";
//import { userProps } from "../interfaces/User";
//import { ListOfCustomers } from "./SelectRole";

export default function EditFoodTabs({
    editName,
    editImage,
    editDesc,
    editRating,
    editType,
    editIngredients,
    editPopular,
    editSpicy,
    editPrice,
    editQuantity,
    editId
}: {
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
}): JSX.Element {
    const [foodlist, setFoodlist] = useState<foodProps[]>(MenuList());

    const [food, setFood] = useState<foodProps>({
        name: editName,
        image: editImage,
        desc: editDesc,
        rating: editRating,
        type: editType,
        ingredients: editIngredients,
        popular: editPopular,
        spicy: editSpicy,
        price: editPrice,
        quantity: editQuantity,
        id: editId
    });

    const {
        name,
        image,
        desc,
        rating,
        type,
        ingredients,
        price,
        popular,
        spicy
    } = food;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFood({
            ...food,
            [name]: value
        });
    };

    const onChangeArray = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newStr = value.split(",");

        setFood({
            ...food,
            [name]: newStr
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
        location.reload();
    };

    // Change the food fields in the menu list when we submit the forms to edit it
    const onSubmit = () => {
        const newFoodList: foodProps[] = foodlist.map(
            (original: foodProps): foodProps => {
                return editName === original.name ? food : original;
            }
        );
        const newEditFoodList: foodProps[] = EditMenuList().map(
            (original: foodProps): foodProps => {
                return editName === original.name ? food : original;
            }
        );
        setFoodlist(newFoodList);
        sessionStorage.setItem("menu", JSON.stringify(newFoodList));
        sessionStorage.setItem("editFoodList", JSON.stringify(newEditFoodList));

        // BELOW FUNCTIONALITY IS NOT REQUIRED, BUT KEPT IN CASE WE WOULD LIKE TO IMPLEMENT
        // // When food is edited, change the food's field in each customer checkout list that has it
        // // First, we map a new customer list with edited field for all customers who have the food item
        // const currentCustomers: userProps[] = ListOfCustomers();
        // const customersWithNewFood: userProps[] = currentCustomers.map(
        //     (customer: userProps) => ({
        //         ...customer,
        //         order: customer.order.map((original: foodProps) => {
        //             if (editName === original.name) {
        //                 return food;
        //             } else {
        //                 return {
        //                     ...original,
        //                     type: original.type,
        //                     ingredients: original.ingredients
        //                 };
        //             }
        //         })
        //     })
        // );
        // // Next, we update sessionStorage with this new customer list so it can render properly in other components
        // sessionStorage.setItem(
        //     "customers",
        //     JSON.stringify(customersWithNewFood)
        // );
    };

    // RENDER OUR CURRENT FOOD TAB WITH ITS FORMS. THESE FORMS WILL INITIALLY HAVE THE FOOD'S CURRENT FIELDS IN THE INPUTS FOR THE EMPLOYEE/OWNER TO EDIT.
    return (
        <TabPanel data-testid={name + " Tab Panel"}>
            <form data-testid="edit-food-form" onSubmit={handleSubmit}>
                <SimpleGrid columns={4} columnGap={5} rowGap={2} w="full">
                    <GridItem colSpan={4}>
                        <FormControl id="name" px={5}>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                data-testid="edit-name-form"
                                isRequired
                                name="name"
                                value={name}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl id="image" px={5}>
                            <FormLabel>Image Link:</FormLabel>
                            <Input
                                data-testid="edit-image-form"
                                isRequired
                                name="image"
                                value={image}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl id="desc" px={5}>
                            <FormLabel>Description:</FormLabel>
                            <Input
                                data-testid="edit-desc-form"
                                isRequired
                                name="desc"
                                value={desc}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl id="type" px={5}>
                            <FormLabel>Type:</FormLabel>
                            <Input
                                data-testid="edit-type-form"
                                isRequired
                                name="type"
                                value={type}
                                onChange={onChangeArray}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl id="ingredients" px={5}>
                            <FormLabel>Ingredients:</FormLabel>
                            <Input
                                data-testid="edit-ingredients-form"
                                isRequired
                                name="ingredients"
                                value={ingredients}
                                onChange={onChangeArray}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl id="rating" px={5}>
                            <FormLabel>Rating:</FormLabel>
                            <Input
                                data-testid="edit-rating-form"
                                isRequired
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                name="rating"
                                value={rating}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5}>
                        <FormControl id="price" px={5}>
                            <FormLabel>Price:</FormLabel>
                            <Input
                                data-testid="edit-price-form"
                                isRequired
                                type="number"
                                min="0"
                                name="price"
                                value={price}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <FormControl id="popular" px={5}>
                            <FormLabel>Popular</FormLabel>
                            <Checkbox
                                data-testid="edit-popular-checkbox"
                                type="checkbox"
                                name="popular"
                                id="popular"
                                value="popular"
                                colorScheme="red"
                                onChange={(e) => {
                                    setFood({
                                        ...food,
                                        popular: e.target.checked
                                    });
                                }}
                                mb={3}
                                defaultChecked={editPopular}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5}>
                        <FormControl id="spicy" px={5}>
                            <FormLabel>Spicy</FormLabel>
                            <Checkbox
                                data-testid="edit-spicy-checkbox"
                                type="checkbox"
                                name="spicy"
                                id="spicy"
                                value="spicy"
                                colorScheme="red"
                                onChange={(e) => {
                                    setFood({
                                        ...food,
                                        spicy: e.target.checked
                                    });
                                }}
                                mb={3}
                                defaultChecked={editSpicy}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Button
                            data-testid="edit-submit"
                            type="submit"
                            //className="editfood-btn"
                            size="lg"
                            w="full"
                            colorScheme="red"
                            variant="solid"
                            isDisabled={
                                name === editName &&
                                image === editImage &&
                                desc === editDesc &&
                                rating == editRating &&
                                type.toString() === editType.toString() &&
                                ingredients.toString() ===
                                    editIngredients.toString() &&
                                popular === editPopular &&
                                spicy === editSpicy &&
                                price == editPrice
                            }
                        >
                            Edit
                        </Button>
                    </GridItem>
                </SimpleGrid>
            </form>
        </TabPanel>
    );
}
