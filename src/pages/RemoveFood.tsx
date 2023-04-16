import React, { useState } from "react";
import RatingFeature from "../components/RatingFeature";
import {
    Heading,
    VStack,
    Stack,
    Spacer,
    Flex,
    Container,
    Grid,
    Image,
    Box
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import foodList from "../data/foods.json";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

export default function RemoveFood() {
    const foods =
        JSON.parse(sessionStorage.getItem("menu")!) === null
            ? foodList.FOODS
            : JSON.parse(sessionStorage.getItem("menu")!);
    const [foodlist, setFoodlist] = useState<foodProps[]>(foods);

    const handleSubmit = (id: string) => {
        const newFoods: foodProps[] = foodlist.map(
            (food: foodProps): foodProps => ({
                ...food,
                type: [...food.type],
                ingredients: [...food.ingredients]
            })
        );
        const foodIndex = newFoods.findIndex(
            (food: foodProps): boolean => food.name === id
        );
        if (foodIndex > -1) {
            newFoods.splice(foodIndex, 1);
        }
        sessionStorage.setItem("menu", JSON.stringify(newFoods));
        setFoodlist(newFoods);
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
            <Container maxW="container.x1" p={0}>
                <Box p={10}>
                    <Heading
                        size="2xl"
                        w="full"
                        h="full"
                        p={10}
                        alignItems="center"
                    >
                        Menu
                    </Heading>
                    <VStack spacing="3px" mt={100} alignItems="center">
                        <Grid templateColumns="repeat(5, 1fr)" rowGap={3}>
                            {foods.map((food: foodProps) => {
                                return (
                                    <Flex
                                        key={food.name}
                                        align="center"
                                        w="90%"
                                        borderWidth={2}
                                        borderColor="black"
                                        borderRadius="md"
                                        p={2}
                                    >
                                        <Image
                                            src={food.image}
                                            alt={food.name}
                                            borderRadius="full"
                                            boxSize="100px"
                                            objectFit="cover"
                                            mr={2}
                                        />
                                        <Box
                                            key={food.name}
                                            w={300}
                                            textAlign="center"
                                            p={1}
                                            alignItems="center"
                                        >
                                            <div className="foodtitle">
                                                {food.name}
                                            </div>
                                            <hr></hr>
                                            <div className="desc">
                                                {food.desc}
                                            </div>
                                            <hr></hr>
                                            <RatingFeature></RatingFeature>
                                        </Box>
                                        <Button
                                            border="1px"
                                            ml={5}
                                            px={5}
                                            id={food.name}
                                            onClick={() => {
                                                handleSubmit(food.name);
                                            }}
                                            borderRadius="5px"
                                            fontSize="16px"
                                            fontWeight="semibold"
                                            bg="red.500"
                                            borderColor="red.600"
                                            color="white"
                                            _hover={{
                                                bg: "red.600",
                                                color: "white"
                                            }}
                                            _active={{
                                                bg: "red.300",
                                                transform: "scale(0.95)",
                                                borderColor: "orange"
                                            }}
                                        >
                                            remove
                                        </Button>
                                    </Flex>
                                );
                            })}
                        </Grid>
                        <br></br>
                        <br></br>
                    </VStack>
                </Box>
            </Container>
            <></>
            <br></br>
            <hr></hr>
        </div>
    );
}
