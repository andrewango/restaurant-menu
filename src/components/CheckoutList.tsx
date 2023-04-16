import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Heading,
    VStack,
    Text
} from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";

export default function CheckoutList(): JSX.Element {
    const [checkoutList, setCheckoutList] = useState<foodProps[]>([]);
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToCheckoutList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const foods: foodProps[] = foodList.FOODS.map(
        (foodItem: foodProps): foodProps => foodItem
    );

    const addFoodToCheckoutList = (name: string) => {
        const chosenFood = foods.filter((foodItem) => name === foodItem.name);
        setCheckoutList([...checkoutList, chosenFood[0]]);
    };
    return (
        <Card
            h="1000px"
            w="500px"
            ref={drop}
            border="2px solid black"
            textAlign="center"
        >
            <CardHeader>
                <Heading fontWeight="bold">Checkout</Heading>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center">
                <VStack w="500px" spacing="3px">
                    {checkoutList.map((food: foodProps) => (
                        <Text key={food.name}>{food.name}</Text>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    );
}
