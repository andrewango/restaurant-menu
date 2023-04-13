import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import foodData from "../data/foods.json";
import RatingFeature from "./RatingFeature";
import { useDrag } from "react-dnd";

export default function ItemListUI() {
    const [{ isDragging }, drag] = useDrag({
        type: "box",
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const foodList = foodData.FOODS.map((food) => {
        return {
            ...food,
            type: [...food.type],
            ingredients: [...food.ingredients]
        };
    });

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
                        ref={drag}
                        opacity={isDragging ? 0.5 : 1.0}
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
