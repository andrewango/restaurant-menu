import React from "react";
import { Box, Grid, useMediaQuery } from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import FoodItem from "./FoodItem";

/**
 * Component representing a list of food items
 * @param foodData - array of food items.
 * @returns JSX element representing the list of food items
 */
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
        <Box
            h="70vh"
            overflowY="scroll"
            mt={50}
            className="section"
            data-testid="item-list-box"
        >
            <Grid
                data-testid="menu"
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
                            rating={food.rating}
                        />
                    );
                })}
            </Grid>
        </Box>
    );
}
