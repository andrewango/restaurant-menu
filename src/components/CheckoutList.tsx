import React, { useState } from "react";
//import { useEffect } from "react";
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

    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foodlist = menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;

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
    //useEffect(() => {
    //  console.log(checkoutList);
    //}, [checkoutList]);

    return (
        <Card
            h="1000px"
            w="500px"
            ref={drop}
            border="5px solid tomato"
            textAlign="center"
        >
            <CardHeader>
                <Heading fontWeight="bold">Checkout</Heading>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center">
                <VStack spacing="5px" w="100%">
                    {checkoutList.map((food: foodProps, index: number) => (
                        <Text key={index + 1} fontWeight="bold">
                            {index + 1}. {food.name}
                        </Text>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    );
}
