import React from "react";
import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import FoodItem from "./FoodItem";

export default function ItemListUI({
    foodData
}: {
    foodData: foodProps[];
}): JSX.Element {
    const foodList = foodData.map((foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients],
            price: foodProps.price
        };
    });
    //Maps each food in our list to a box with food details
    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
    return (
        <Box h={window.innerHeight * 0.5} overflowY="scroll" mt={50}>
            <Grid
                templateColumns={
                    isLargerThan2000 ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
                }
                rowGap={3}
                columnGap={3}
            >
                {foodList.map((food) => {
                    return (
                        <FoodItem
                            key={food.name}
                            name={food.name}
                            image={food.image}
                            desc={food.desc}
                            ingredients={food.ingredients}
                            price={food.price}
                        />
                    );
                })}
            </Grid>
        </Box>
    );
}
