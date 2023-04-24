import React, { useState } from "react";
// Uncomment next line for state debugging
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
import { useDrag, useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import "./Scrollbar.css";
import { MenuList } from "../pages/AddFood";

export default function CheckoutList(): JSX.Element {
    const [checkoutList, setCheckoutList] = useState<foodProps[]>([]);

    function CheckoutItem({ name }: { name: string }): JSX.Element {
        const [, drag] = useDrag(() => ({
            type: "removeItem",
            item: { name: name },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));
        return (
            <Text ref={drag} fontWeight="bold">
                {name}
            </Text>
        );
    }

    const [, addDrop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToCheckoutList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    const [{ isOver }, removeDrop] = useDrop(() => ({
        accept: "removeItem",
        drop: (item: foodProps) => {
            removeFoodFromCheckoutList(item.name);
        },
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

    const removeFoodFromCheckoutList = (name: string) => {
        setCheckoutList((updatedCheckout) => {
            const foodToRemoveIndex = updatedCheckout.findIndex(
                (foodItem: foodProps): boolean => foodItem.name === name
            );
            if (foodToRemoveIndex > -1) {
                const newCheckoutList: foodProps[] = updatedCheckout.map(
                    (food: foodProps): foodProps => ({
                        ...food,
                        type: [...food.type],
                        ingredients: [...food.ingredients]
                    })
                );
                newCheckoutList.splice(foodToRemoveIndex, 1);
                return newCheckoutList;
            } else {
                return updatedCheckout;
            }
        });
    };

    // Debugging
    //useEffect(() => {
    //console.log(checkoutList);
    //}, [checkoutList]);

    return (
        <Card
            h={window.innerHeight * 0.6}
            w={window.innerWidth * 0.35}
            border="5px solid tomato"
            textAlign="center"
        >
            <CardHeader ref={removeDrop} backgroundColor={isOver ? "red" : ""}>
                <Heading fontWeight="bold">Checkout</Heading>
                <Text fontWeight="semibold">Drag here to remove items</Text>
            </CardHeader>
            <Divider></Divider>
            <CardBody ref={addDrop} textAlign="center" overflowY="auto">
                <VStack spacing="5px" w="100%">
                    {checkoutList.map((food: foodProps, index: number) => (
                        <CheckoutItem
                            key={index + 1}
                            name={food.name}
                        ></CheckoutItem>
                    ))}
                </VStack>
            </CardBody>
        </Card>
    );
}
