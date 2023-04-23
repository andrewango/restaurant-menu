import React, { useState } from "react";
//import { useEffect } from "react";
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
import foodList from "../data/foods.json";

export default function EditFoodTabs({
    editName,
    editImage,
    editDesc,
    editRating,
    editType,
    editIngredients,
    editPopular,
    editSpicy,
    editPrice
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
}): JSX.Element {
    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foods = menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;
    const [foodlist, setFoodlist] = useState<foodProps[]>(foods);

    function EditMenuList() {
        const editMenu = sessionStorage.getItem("editFoodList");
        const editMenuToParse =
            editMenu !== null && editMenu !== undefined ? editMenu : "";
        return editMenuToParse ? JSON.parse(editMenuToParse) : [];
    }

    const [food, setFood] = useState<foodProps>({
        name: editName,
        image: editImage,
        desc: editDesc,
        rating: editRating,
        type: editType,
        ingredients: editIngredients,
        popular: editPopular,
        spicy: editSpicy,
        price: editPrice
    });

    const { name, image, desc, rating, type, ingredients, price } = food;

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
    };

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
    };
    return (
        <TabPanel>
            <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" width="200%" px={5}>
                        <GridItem colSpan={2}>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                isRequired
                                name="name"
                                value={name}
                                onChange={onChange}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Image Link:</FormLabel>
                            <Input
                                isRequired
                                name="image"
                                value={image}
                                onChange={onChange}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Description:</FormLabel>
                            <Input
                                isRequired
                                name="desc"
                                value={desc}
                                onChange={onChange}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Rating:</FormLabel>
                            <Input
                                isRequired
                                type="number"
                                name="rating"
                                value={rating}
                                onChange={onChange}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Type:</FormLabel>
                            <Input
                                isRequired
                                name="type"
                                value={type}
                                onChange={onChangeArray}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Ingredients:</FormLabel>
                            <Input
                                isRequired
                                name="ingredients"
                                value={ingredients}
                                onChange={onChangeArray}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={2}>
                            <FormLabel>Price:</FormLabel>
                            <Input
                                isRequired
                                type="number"
                                name="price"
                                value={price}
                                onChange={onChange}
                                mb={2}
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormLabel>Popular</FormLabel>
                            <Checkbox
                                type="checkbox"
                                name="popular"
                                id="popular"
                                value="popular"
                                onChange={(e) => {
                                    setFood({
                                        ...food,
                                        popular: e.target.checked
                                    });
                                }}
                                mb={3}
                                isChecked={food.popular}
                            />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <FormLabel>Spicy</FormLabel>
                            <Checkbox
                                type="checkbox"
                                name="spicy"
                                id="spicy"
                                value="spicy"
                                onChange={(e) => {
                                    setFood({
                                        ...food,
                                        spicy: e.target.checked
                                    });
                                }}
                                mb={3}
                                isChecked={food.spicy}
                            />
                        </GridItem>
                        <br></br>
                        <Button type="submit">Edit</Button>
                    </FormControl>
                </form>
            </SimpleGrid>
        </TabPanel>
    );
}
