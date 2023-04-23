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
import "./Scrollbar.css";
import { MenuList } from "../pages/AddFood";

export default function CheckoutList(): JSX.Element {
    const [checkoutList, setCheckoutList] = useState<foodProps[]>([]);
    const [, drop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToCheckoutList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const foods: foodProps[] = MenuList().map(
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
            h={window.innerHeight * 0.6}
            w={window.innerWidth * 0.35}
            ref={drop}
            border="5px solid tomato"
            textAlign="center"
        >
            <CardHeader>
                <Heading fontWeight="bold">Checkout</Heading>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center" overflowY="auto">
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
