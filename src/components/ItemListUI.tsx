import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import foodData from "../data/foods.json";
import RatingFeature from "./RatingFeature";

export default function ItemListUI() {
    // Copies foods from our JSON data to a list
    const foodList = foodData.FOODS.map((food) => {
        return {
            ...food,
            type: [...food.type],
            ingredients: [...food.ingredients]
        };
    });

    // Maps each food in our list to a box with food details
    return (
        <VStack spacing="3px" mt={100}>
            {foodList.map((food) => {
                return (
                    <Box
                        key={food.name}
                        w={300}
                        textAlign="center"
                        borderWidth={2}
                        borderColor="black"
                        borderRadius="md"
                        p={2}
                    >
                        <b>{food.name}</b>
                        <br></br>
                        {food.desc}
                        <RatingFeature></RatingFeature>
                    </Box>
                );
            })}
        </VStack>
    );
}
