import React, { useState } from "react";
import {
    Heading,
    Stack,
    Checkbox,
    GridItem,
    SimpleGrid
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/react";
import foodList from "../data/foods.json";
import { foodProps } from "../interfaces/Food";
import "./Styles.css";

export function MenuList() {
    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    return menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;
}
export default function AddNewFood() {
    const [foodlist, setFoodlist] = useState<foodProps[]>(MenuList());

    const [food, setFood] = useState<foodProps>({
        name: "",
        image: "",
        desc: "",
        rating: 0,
        type: [],
        ingredients: [],
        popular: false,
        spicy: false,
        price: 0,
        quantity: 0,
        id: 1
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
        // console.log("menu" + sessionStorage.getItem("menu"));
        // setFood({
        //     name: "",s
        //     image: "",
        //     desc: "",
        //     rating: 0,
        //     type: [],
        //     ingredients: [],
        //     popular: false,
        //     spicy: false,
        //     price: 0,
        //     quantity: 0
        // });
        location.reload();
    };

    const onSubmit = () => {
        const copy: foodProps[] = foodlist.map(
            (food: foodProps): foodProps => ({
                ...food,
                type: [...food.type],
                ingredients: [...food.ingredients]
            })
        );
        const newFoodList: foodProps[] = [...copy, food];
        setFoodlist(newFoodList);
        sessionStorage.setItem("menu", JSON.stringify(newFoodList));
    };

    return (
        <Stack w="full" h="full" p={10} spacing={20} alignItems="flex-start">
            <Heading size="2xl">New Food</Heading>
            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={6} columnGap={2} rowGap={2} w="full">
                    <GridItem colSpan={6}>
                        <FormControl data-testid="name-input" id="name" px={5}>
                            <FormLabel>Name:</FormLabel>
                            <Input
                                isRequired
                                name="name"
                                value={name}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl data-testid="image-input" id="name" px={5}>
                            <FormLabel>Image Link:</FormLabel>
                            <Input
                                isRequired
                                name="image"
                                value={image}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl data-testid="desc-input" id="name" px={5}>
                            <FormLabel>Description:</FormLabel>
                            <Input
                                isRequired
                                name="desc"
                                value={desc}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl data-testid="type-input" id="name" px={5}>
                            <FormLabel>Type:</FormLabel>
                            <Input
                                isRequired
                                name="type"
                                value={type}
                                onChange={onChangeArray}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <FormControl
                            data-testid="ingredients-input"
                            id="name"
                            px={5}
                        >
                            <FormLabel>Ingredients:</FormLabel>
                            <Input
                                isRequired
                                name="ingredients"
                                value={ingredients}
                                onChange={onChangeArray}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <FormControl
                            data-testid="rating-input"
                            id="name"
                            px={5}
                        >
                            <FormLabel>Rating:</FormLabel>
                            <Input
                                isRequired
                                type="number"
                                min="0"
                                max="5"
                                name="rating"
                                value={rating}
                                onChange={onChange}
                                mb={2}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colStart={4} colEnd={7}>
                        <FormControl data-testid="price-input" id="name" px={5}>
                            <FormLabel>Price:</FormLabel>
                            <Input
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
                    <GridItem colSpan={3}>
                        <FormControl id="name" px={5}>
                            <FormLabel>Popular</FormLabel>
                            <Checkbox
                                data-testid="popular-checkbox"
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
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colStart={4} colEnd={7}>
                        <FormControl id="name" px={5}>
                            <FormLabel>Spicy</FormLabel>
                            <Checkbox
                                data-testid="spicy-checkbox"
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
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={6}>
                        <Button
                            size="lg"
                            w="full"
                            type="submit"
                            colorScheme="red"
                            variant="solid"
                        >
                            Add
                        </Button>
                    </GridItem>
                </SimpleGrid>
            </form>
        </Stack>
    );
}
