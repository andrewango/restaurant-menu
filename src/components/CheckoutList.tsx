import React, { useState } from "react";
import { Card, VStack } from "@chakra-ui/react";
import RatingFeature from "./RatingFeature";
import { useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import FoodItem from "./FoodItem";

export default function CheckoutList(): JSX.Element {
    const [checkoutList, setCheckoutList] = useState<foodProps[]>([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToCheckoutList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const addFoodToCheckoutList = (name: string) => {
        console.log(name);
    };
    return (
        <Card ref={drop} border="5px solid black">
            <VStack spacing="3px" mt={100}>
                {checkoutList.map((food: foodProps) => (
                    <FoodItem
                        key={food.name}
                        name={food.name}
                        image={food.image}
                        desc={food.desc}
                        ingredients={food.ingredients}
                    ></FoodItem>
                ))}
            </VStack>
        </Card>
    );
}
