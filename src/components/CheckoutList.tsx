import React, { useState } from "react";
// Uncomment next line for state debugging
import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Heading,
    VStack,
    Text,
    Box,
    Grid,
    useMediaQuery
} from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import { MenuList } from "../pages/AddFood";
import { GetCurrentUser, ListOfCustomers } from "./SelectRole";
import { userProps } from "../interfaces/User";

export function CurrentCheckoutList(): foodProps[] {
    const checkout: string | null = sessionStorage.getItem("checkout");
    const checkoutToParse =
        checkout !== null && checkout !== undefined ? checkout : "";
    return checkoutToParse ? JSON.parse(checkoutToParse) : [];
}

export default function CheckoutList(): JSX.Element {
    // Get initial current checkout list
    const currentCheckout: foodProps[] = CurrentCheckoutList();
    const [checkoutList, setCheckoutList] =
        useState<foodProps[]>(currentCheckout);

    // Update the checkout list everytime we change customer role to the customer's order
    useEffect(() => {
        const handleStorage = () => {
            //console.log("handleStorage called");
            // Get the menu window's "checkout" key from Session Storage
            const storage: string | null =
                window.sessionStorage.getItem("checkout");
            const storageCheckout: foodProps[] = storage
                ? JSON.parse(storage)
                : [];
            setCheckoutList(storageCheckout);
        };
        // Event listeners to run handleStorage() if "checkout" key is updated
        window.addEventListener("checkoutUpdated", handleStorage);
        return () =>
            window.removeEventListener("checkoutUpdated", handleStorage);
    }, []);

    // CheckoutItem
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
        const chosenFood: foodProps | undefined = foods.find(
            (foodItem) => name === foodItem.name
        );
        if (chosenFood) {
            setCheckoutList((checkoutList) => {
                const newOrder: foodProps[] = [
                    ...checkoutList.map(
                        (food: foodProps): foodProps => ({
                            ...food,
                            type: [...food.type],
                            ingredients: [...food.ingredients]
                        })
                    ),
                    chosenFood
                ];
                sessionStorage.setItem("checkout", JSON.stringify(newOrder));
                const listOfCustomers = ListOfCustomers();
                const currentUser: userProps = GetCurrentUser();
                const newUser: userProps = {
                    ...currentUser,
                    order: newOrder
                };
                sessionStorage.setItem("user", JSON.stringify(newUser));
                const userIndex: number = listOfCustomers.findIndex(
                    (user: userProps) => newUser.orderID === user.orderID
                );
                console.log(userIndex);
                if (userIndex > -1) {
                    listOfCustomers.splice(userIndex, 1, newUser);
                    console.log(listOfCustomers);
                    sessionStorage.setItem(
                        "customers",
                        JSON.stringify(listOfCustomers)
                    );
                }
                return newOrder;
            });
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
                sessionStorage.setItem(
                    "checkout",
                    JSON.stringify(newCheckoutList)
                );
                const listOfCustomers = ListOfCustomers();
                const currentUser: userProps = GetCurrentUser();
                const newUser: userProps = {
                    ...currentUser,
                    order: newCheckoutList
                };
                sessionStorage.setItem("user", JSON.stringify(newUser));
                const userIndex: number = listOfCustomers.findIndex(
                    (user: userProps) => newUser.orderID === user.orderID
                );
                console.log(userIndex);
                if (userIndex > -1) {
                    listOfCustomers.splice(userIndex, 1, newUser);
                    console.log(listOfCustomers);
                    sessionStorage.setItem(
                        "customers",
                        JSON.stringify(listOfCustomers)
                    );
                }
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
    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");

    return (
        <Box h={window.innerHeight * 0.72} mt={100}>
            <VStack spacing="3px">
                <Grid
                    templateColumns={
                        isLargerThan2000 ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
                    }
                    rowGap={3}
                >
                    <Card
                        h={window.innerHeight * 0.7}
                        w={window.innerWidth * 0.4}
                        border="5px solid tomato"
                        textAlign="center"
                    >
                        <CardHeader
                            ref={removeDrop}
                            backgroundColor={isOver ? "red" : ""}
                        >
                            <Heading fontWeight="bold">Checkout</Heading>
                            <Text fontWeight="semibold">
                                Drag here to remove items
                            </Text>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody
                            ref={addDrop}
                            textAlign="center"
                            overflowY="auto"
                        >
                            <VStack spacing="5px" w="100%">
                                {checkoutList.map(
                                    (food: foodProps, index: number) => (
                                        <CheckoutItem
                                            key={index + 1}
                                            name={food.name}
                                        ></CheckoutItem>
                                    )
                                )}
                            </VStack>
                        </CardBody>
                    </Card>
                </Grid>
            </VStack>
        </Box>
    );
}
