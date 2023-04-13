import React from "react";
import { VStack, Box } from "@chakra-ui/react";
import foodData from "../data/foods.json";
import RatingFeature from "./RatingFeature";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function ItemListUI() {
    const foodList = foodData.FOODS.map((food) => {
        return {
            ...food,
            type: [...food.type],
            ingredients: [...food.ingredients]
        };
    });

    const [{ isDragging }, drag] = useDrag({
        type: "box",
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    return (
        <DndProvider backend={HTML5Backend}>
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
        </DndProvider>
    );
}
