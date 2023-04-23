import React, { useState } from "react";
import FoodListAddUI from "../components/FoodListAddUI";
import {
    Heading,
    Stack,
    Spacer,
    Flex,
    Checkbox,
    Grid,
    GridItem,
    SimpleGrid,
    Box
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/react";
import foodList from "../data/foods.json";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

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
        <div style={{ padding: 10 }}>
            <Flex wrap="wrap">
                <Heading
                    display="flex"
                    justifyContent="center"
                    mt={8}
                    px={10}
                    fontSize="50px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    edit foods
                </Heading>
                <Spacer></Spacer>
                <Stack
                    px={10}
                    py={3}
                    mb={5}
                    spacing={6}
                    direction="column"
                    textAlign="center"
                >
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="solid"
                    >
                        edit foods
                    </Button>
                    <Button
                        as={NavLink}
                        to="/EditUsers"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        edit users
                    </Button>
                </Stack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <Box w="100%" maxW="100vw">
                <br></br>
                <Grid templateColumns="repeat(10, minmax(0,1fr))" gap={4}>
                    <GridItem colStart={2} colEnd={5}>
                        <Stack
                            w="full"
                            h="full"
                            p={10}
                            spacing={20}
                            alignItems="flex-start"
                        >
                            <Heading size="2xl">Add New Food</Heading>
                            <form onSubmit={handleSubmit}>
                                <SimpleGrid
                                    columns={4}
                                    columnGap={20}
                                    rowGap={2}
                                    w="full"
                                >
                                    <GridItem colSpan={4}>
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
                                    <GridItem colSpan={4}>
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
                                    <GridItem colSpan={4}>
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
                                    <GridItem colSpan={4}>
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
                                    <GridItem colSpan={4}>
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
                                    <GridItem colSpan={2}>
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
                                    <GridItem colStart={3} colEnd={5}>
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
                                    <GridItem colSpan={2}>
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
                                    <GridItem colStart={3} colEnd={5}>
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
                                    <GridItem colSpan={4}>
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

                    <GridItem colStart={5} colEnd={10} h="10">
                        <Heading
                            size="2xl"
                            w="full"
                            h="full"
                            p={10}
                            alignItems="flex-start"
                        >
                            Menu
                        </Heading>
                        <FoodListAddUI></FoodListAddUI>
                    </GridItem>
                </Grid>
            </Box>
            <></>
            <br></br>
        </div>
    );
}
