import React, { useEffect, useState } from "react";
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
    const [, drop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToCheckoutList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const foodlist =
        JSON.parse(sessionStorage.getItem("menu")!) === null
            ? foodList.FOODS
            : JSON.parse(sessionStorage.getItem("menu")!);

    const foods: foodProps[] = foodlist.map(
        (foodItem: foodProps): foodProps => foodItem
    );

    const addFoodToCheckoutList = (name: string) => {
        const chosenFood = foods.find((foodItem) => name === foodItem.name);
        if (chosenFood) {
            setCheckoutList((checkoutList) => [...checkoutList, chosenFood]);
        }
    };

    // Debugging
    useEffect(() => {
        console.log(checkoutList);
    }, [checkoutList]);

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
                        <Text key={food.name} fontWeight="bold">
                            {food.name}
                        </Text>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    );
}
