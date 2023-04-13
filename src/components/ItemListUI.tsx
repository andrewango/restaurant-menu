import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import RatingFeature from "./RatingFeature";
import { foodProps } from "../interfaces/Food";
export default function ItemListUI({
    foodData
}: {
    foodData: foodProps[];
}): JSX.Element {
    const foodList = foodData.map((foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients]
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
                        <div className="foodtitle">{food.name}</div>
                        <div className="desc">{food.desc}</div>
                        <RatingFeature></RatingFeature>
                    </Box>
                );
            })}
        </VStack>
    );
}
