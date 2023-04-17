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

    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foodlist =
        menuToParse === "" ? foodList.FOODS : JSON.parse(menuToParse);
    const foods: foodProps[] = foodlist.map(
        (foodItem: foodProps): foodProps => foodItem
    );

    const addFoodToCheckoutList = (name: string) => {
        const chosenFood = foods.find((foodItem) => name === foodItem.name);
        if (chosenFood) {
            setCheckoutList((checkoutList) => [...checkoutList, chosenFood]);
            setCheckoutID((checkoutID) => checkoutID++);
        }
    };

    // Debugging
    useEffect(() => {
        console.log(checkoutList);
    }, [checkoutList]);

    const [checkoutID, setCheckoutID] = useState<number>(1);
    return (
        <Card
            h="1000px"
            w="500px"
            ref={drop}
            border="1px solid black"
            textAlign="center"
        >
            <CardHeader>
                <Heading fontWeight="bold">Checkout</Heading>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center">
                <VStack w="500px" spacing="3px">
                    {checkoutList.map((food: foodProps, index: number) => (
                        <Text key={index + checkoutID} fontWeight="bold">
                            {index + checkoutID}. {food.name}
                        </Text>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    );
}
