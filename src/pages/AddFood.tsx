import React, { useState } from "react";
import {
    Heading,
    Stack,
    Checkbox,
    Grid,
    GridItem,
    SimpleGrid,
    Box,
    Flex,
    Spacer,
    VStack
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/react";
import foodList from "../data/foods.json";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import RemoveFood from "../components/RemoveFood";
import "../components/Styles.css";

export function MenuList() {
    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    return menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;
}
export default function AddFood() {
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
        price: 0
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
        console.log(sessionStorage.getItem("menu"));
        setFood({
            name: "",
            image: "",
            desc: "",
            rating: 0,
            type: [],
            ingredients: [],
            popular: false,
            spicy: false,
            price: 0
        });
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
        <div style={{ padding: 10 }} data-testid="add-food-page">
            <Flex wrap="wrap">
                <Heading className="heading">Add / Remove Food</Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Edit Food
                    </Button>
                    <Button
                        as={NavLink}
                        to="/UserStats"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        View Stats
                    </Button>
                </VStack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <Box w="100%" maxW="100vw">
                <br></br>
                <Grid templateColumns="repeat(20, minmax(0,1fr))" gap={4}>
                    <GridItem colStart={1} colEnd={7}>
                        <Stack
                            w="full"
                            h="full"
                            p={10}
                            spacing={20}
                            alignItems="flex-start"
                        >
                            <Heading size="2xl">New Food</Heading>
                            <form onSubmit={handleSubmit}>
                                <SimpleGrid
                                    columns={6}
                                    columnGap={2}
                                    rowGap={2}
                                    w="full"
                                >
                                    <GridItem colSpan={6}>
                                        <FormControl id="name" px={5}>
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
                                        <FormControl id="name" px={5}>
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
                                        <FormControl id="name" px={5}>
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
                                        <FormControl id="name" px={5}>
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
                                        <FormControl id="name" px={5}>
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
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Rating:</FormLabel>
                                            <Input
                                                isRequired
                                                type="number"
                                                name="rating"
                                                value={rating}
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colStart={4} colEnd={7}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Price:</FormLabel>
                                            <Input
                                                isRequired
                                                type="number"
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
                                                type="checkbox"
                                                name="popular"
                                                id="popular"
                                                value="popular"
                                                colorScheme="red"
                                                onChange={(e) => {
                                                    setFood({
                                                        ...food,
                                                        popular:
                                                            e.target.checked
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
                    </GridItem>

                    <GridItem colStart={7} colEnd={20} h="10">
                        <Heading
                            size="2xl"
                            w="full"
                            h="full"
                            p={10}
                            alignItems="flex-start"
                        >
                            Menu
                        </Heading>
                        <RemoveFood></RemoveFood>
                    </GridItem>
                </Grid>
            </Box>
            <></>
            <br></br>
        </div>
    );
}
