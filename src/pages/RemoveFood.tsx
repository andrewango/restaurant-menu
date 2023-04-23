import React, { useState } from "react";
import {
    Heading,
    VStack,
    Stack,
    Spacer,
    Flex,
    Container,
    Grid,
    Image,
    Box,
    useMediaQuery,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import { EditMenuList } from "../components/EditFoodList";
import { MenuList } from "./AddFood";

export default function RemoveFood() {
    const [foodlist, setFoodlist] = useState<foodProps[]>(MenuList());

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

        const newEditFoods: foodProps[] = EditMenuList().map(
            (food: foodProps): foodProps => ({
                ...food,
                type: [...food.type],
                ingredients: [...food.ingredients]
            })
        );
        const removeFoodIndex = EditMenuList().findIndex(
            (food: foodProps): boolean => food.name === id
        );
        if (removeFoodIndex > -1) {
            newEditFoods.splice(removeFoodIndex, 1);
        }
        sessionStorage.setItem("editFoodList", JSON.stringify(newEditFoods));
    };
    function screenSize() {
        const [isLargerThan2500] = useMediaQuery("(min-width: 2500px)");
        const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
        const [isLargerThan1500] = useMediaQuery("(min-width: 1500px)");
        const [isLargerThan1000] = useMediaQuery("(min-width: 1000px)");
        if (isLargerThan2500) {
            return "repeat(5, 1fr)";
        } else if (isLargerThan2000) {
            return "repeat(4, 1fr)";
        } else if (isLargerThan1500) {
            return "repeat(3, 1fr)";
        } else if (isLargerThan1000) {
            return "repeat(2, 1fr)";
        } else {
            return "repeat(1, 1fr)";
        }
    }
    console.log(screenSize());
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
                        <Button
                            as={NavLink}
                            to="/AddFood"
                            colorScheme="red"
                            size="md"
                            variant="outline"
                            float="right"
                        >
                            Add New Food
                        </Button>
                    </Heading>
                    <VStack
                        spacing="3px"
                        mt={50}
                        alignItems="center"
                        ml={10}
                        overflowX="hidden"
                    >
                        <Grid templateColumns={screenSize()} rowGap={3}>
                            {MenuList().map((food: foodProps) => {
                                return (
                                    <Flex
                                        key={food.name}
                                        align="center"
                                        w="90%"
                                        borderWidth={2}
                                        borderColor="black"
                                        borderRadius="md"
                                        p={1}
                                    >
                                        <Accordion
                                            allowToggle
                                            textAlign="center"
                                            w="100%"
                                        >
                                            <AccordionItem>
                                                <h2>
                                                    <AccordionButton>
                                                        <Image
                                                            src={food.image}
                                                            alt={food.name}
                                                            borderRadius="full"
                                                            boxSize="100px"
                                                            objectFit="cover"
                                                            mr={2}
                                                            ml={2}
                                                        />
                                                        <Box
                                                            key={food.name}
                                                            w={300}
                                                            textAlign="center"
                                                            p={5}
                                                            alignItems="center"
                                                        >
                                                            <div className="foodtitle">
                                                                {food.name}
                                                            </div>
                                                        </Box>
                                                        <Button
                                                            border="1px"
                                                            ml={5}
                                                            mr={3}
                                                            px={5}
                                                            id={food.name}
                                                            onClick={() => {
                                                                handleSubmit(
                                                                    food.name
                                                                );
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
                                                                transform:
                                                                    "scale(0.95)",
                                                                borderColor:
                                                                    "orange"
                                                            }}
                                                        >
                                                            remove
                                                        </Button>
                                                        <AccordionIcon />
                                                    </AccordionButton>
                                                </h2>
                                                <AccordionPanel pb={4}>
                                                    {food.desc}
                                                    <hr></hr>
                                                    <b>Type: </b>{" "}
                                                    {food.type.join(", ")}
                                                    <br></br>
                                                    <b>Ingredients: </b>{" "}
                                                    {food.ingredients.join(
                                                        ", "
                                                    )}
                                                    <br></br>
                                                    <b>
                                                        {food.popular
                                                            ? food.spicy
                                                                ? "Popular, Spicy"
                                                                : "Popular"
                                                            : ""}
                                                        {!food.popular &&
                                                        food.spicy
                                                            ? "Spicy"
                                                            : ""}
                                                    </b>
                                                    {(food.popular ||
                                                        food.spicy) && (
                                                        <>&emsp; | &emsp;</>
                                                    )}
                                                    <b>Rating: </b>{" "}
                                                    {food.rating}
                                                    <>&emsp;|&emsp;</>
                                                    <b>Price: </b> <>$</>
                                                    {food.price}
                                                </AccordionPanel>
                                            </AccordionItem>
                                        </Accordion>
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
