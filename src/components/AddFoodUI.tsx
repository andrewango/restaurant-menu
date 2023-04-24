import React from "react";
import {
    VStack,
    Box,
    Image,
    Flex,
    Grid,
    useMediaQuery,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import { MenuList } from "../pages/AddFood";

export default function AddFoodUI(): JSX.Element {
    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
    const [isLargerThan1200] = useMediaQuery("(min-width: 1200px)");
    const [isLargerThan1000] = useMediaQuery("(min-height: 1000px)");

    // Maps each food in our list to a box with food details
    return (
        <VStack
            spacing="3px"
            mt={100}
            alignItems="center"
            h={isLargerThan1000 ? window.innerHeight * 0.65 : "600px"}
            w="110%"
            overflowY="scroll"
            className="section"
        >
            <Grid
                templateColumns={
                    isLargerThan1200
                        ? isLargerThan2000
                            ? "repeat(3, 1fr)"
                            : "repeat(2, 1fr)"
                        : "repeat(1, 1fr)"
                }
                rowGap={3}
            >
                {MenuList().map((food: foodProps) => {
                    return (
                        <Flex
                            key={food.name}
                            align="center"
                            w="95%"
                            borderWidth={2}
                            borderColor="black"
                            borderRadius="md"
                            p={1}
                        >
                            <Accordion allowToggle textAlign="center" w="100%">
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
                                            />
                                            <Box
                                                key={food.name}
                                                w={300}
                                                textAlign="center"
                                                p={1}
                                                alignItems="flex-start"
                                            >
                                                <div className="foodtitle">
                                                    {food.name}
                                                </div>
                                            </Box>
                                            <AccordionIcon />
                                        </AccordionButton>
                                    </h2>
                                    <AccordionPanel pb={4}>
                                        {food.desc}
                                        <hr></hr>
                                        <b>Type: </b> {food.type.join(", ")}
                                        <br></br>
                                        <b>Ingredients: </b>{" "}
                                        {food.ingredients.join(", ")}
                                        <br></br>
                                        <b>
                                            {food.popular
                                                ? food.spicy
                                                    ? "Popular, Spicy"
                                                    : "Popular"
                                                : ""}
                                            {!food.popular && food.spicy
                                                ? "Spicy"
                                                : ""}
                                        </b>
                                        {(food.popular || food.spicy) && (
                                            <>&emsp; | &emsp;</>
                                        )}
                                        <b>Rating: </b> {food.rating}
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
    );
}
