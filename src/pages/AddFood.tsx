import React, { useState } from "react";
import FoodListAddUI from "../components/FoodListAddUI";
import {
    Heading,
    VStack,
    Stack,
    Spacer,
    Flex,
    Checkbox,
    Container,
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

export default function AddFood() {
    const [foods, setFoods] = useState<foodProps[]>(
        sessionStorage.getItem("menu") === null
            ? foodList.FOODS
            : JSON.parse(sessionStorage.getItem("menu")!)
    );
    const [foodlist, setFoodlist] = useState<foodProps[]>(foods);
    const [popular, setPopular] = useState<boolean>(false);
    const [spicy, setSpicy] = useState<boolean>(false);
    const [checkedItems, setCheckedItems] = useState([false, false]);
    const [food, setFood] = useState<foodProps>({
        name: "",
        image: "",
        desc: "",
        rating: 0,
        type: [],
        ingredients: [],
        popular: popular,
        spicy: spicy
    });

    const { name, image, desc, rating, type, ingredients } = food;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFood({
            ...food,
            [name]: value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
        sessionStorage.setItem("menu", JSON.stringify(foodlist));
        setFoods(JSON.parse(sessionStorage.getItem("menu")!));
        setFood({
            name: "",
            image: "",
            desc: "",
            rating: 0,
            type: [],
            ingredients: [],
            popular: false,
            spicy: false
        });
        const popularCheck = document.getElementById(
            "popular"
        ) as HTMLInputElement;
        const spicyCheck = document.getElementById("spicy") as HTMLInputElement;
        popularCheck.checked = false;
        spicyCheck.checked = false;
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
                    edit users
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
            <Container maxW="container.x1" p={0}>
                <Grid templateColumns="repeat(10, 1fr)" gap={4}>
                    <GridItem colStart={2} colEnd={4} h="20">
                        <Stack
                            w="full"
                            h="full"
                            p={10}
                            spacing={10}
                            alignItems="flex-start"
                        >
                            <Heading size="2xl">Add New Food</Heading>
                            <SimpleGrid
                                columns={2}
                                columnGap={3}
                                rowGap={6}
                                w="full"
                            >
                                <form onSubmit={handleSubmit}>
                                    <FormControl id="name" width="300%" px={10}>
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
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </GridItem>
                                        <GridItem colSpan={2}>
                                            <FormLabel>Ingredients:</FormLabel>
                                            <Input
                                                isRequired
                                                name="ingredients"
                                                value={ingredients}
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
                                                checked={popular}
                                                onChange={(e) => {
                                                    setFood({
                                                        ...food,
                                                        popular:
                                                            e.target.checked
                                                    });
                                                }}
                                                mb={3}
                                            />
                                        </GridItem>
                                        <GridItem colSpan={1}>
                                            <FormLabel>Spicy</FormLabel>
                                            <Checkbox
                                                type="checkbox"
                                                name="spicy"
                                                id="spicy"
                                                value="spicy"
                                                checked={spicy}
                                                onChange={(e) => {
                                                    setFood({
                                                        ...food,
                                                        spicy: e.target.checked
                                                    });
                                                }}
                                                mb={3}
                                            />
                                        </GridItem>
                                        <br></br>
                                        <Button type="submit">
                                            Add New Food
                                        </Button>
                                    </FormControl>
                                </form>
                            </SimpleGrid>
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
            </Container>
            <></>
            <br></br>
            <hr></hr>
        </div>
    );
}
