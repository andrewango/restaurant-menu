import React from "react";
import { VStack, Box, Image, Flex, Grid } from "@chakra-ui/react";
import RatingFeature from "./RatingFeature";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";

export default function FoodListAddUI(): JSX.Element {
    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foods = menuToParse === "" ? foodList.FOODS : JSON.parse(menuToParse);

    const foodlist = foods.map((foodProps: foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients]
        };
    });

    // console.log(`loaded: ${foodlist}`);

    // Maps each food in our list to a box with food details
    return (
        <VStack spacing="3px" mt={100} alignItems="flex-start">
            <Grid templateColumns="repeat(3, 1fr)" rowGap={3}>
                {foodlist.map((food: foodProps) => {
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
                                alignItems="flex-start"
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
            </Grid>
            <br></br>
            <br></br>
        </VStack>
    );
}
