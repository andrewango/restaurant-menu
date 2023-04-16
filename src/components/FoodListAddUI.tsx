import React from "react";
import { VStack, Box, Image, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import RatingFeature from "./RatingFeature";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
export default function FoodListAddUI(): JSX.Element {
    const foods =
        sessionStorage.getItem("menu") === null
            ? foodList.FOODS
            : JSON.parse(sessionStorage.getItem("menu")!);
    const foodlist = foods.map((foodProps: foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients]
        };
    });
    // Maps each food in our list to a box with food details
    return (
        <VStack spacing="3px" mt={100}>
            <SimpleGrid columns={3} spacingX={410} spacingY={3}>
                {foodlist.map((food: foodProps, i: number) => {
                    return (
                        <Flex
                            key={food.name}
                            align="center"
                            w={400}
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
                                p={2}
                            >
                                <div className="foodtitle">{food.name}</div>
                                <hr></hr>
                                <div className="desc">{food.desc}</div>
                                <hr></hr>
                                <RatingFeature></RatingFeature>
                            </Box>
                        </Flex>
                    );
                })}
            </SimpleGrid>
        </VStack>
    );
}
