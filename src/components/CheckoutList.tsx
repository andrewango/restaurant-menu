import React, { useState } from "react";
// Uncomment next line for state debugging
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Heading,
    VStack,
    Box,
    Grid,
    useMediaQuery,
    Flex,
    AccordionItem,
    AccordionIcon,
    AccordionButton,
    AccordionPanel,
    Accordion,
    Button,
    FormControl,
    FormLabel,
    Input,
    Center
} from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import { MenuList } from "../pages/AddFood";
import { GetCurrentUser, ListOfCustomers } from "./SelectRole";
import { userProps } from "../interfaces/User";
import { DeliveryDropDown } from "./DeliveryDropDown";

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

    // Filter checkout list by search query
    const [searchText, setSearchText] = useState<string>("");
    const searchedFoods: foodProps[] = checkoutList.filter(
        (food: foodProps): boolean => {
            return (
                searchText === "" ||
                food.ingredients
                    .join(", ")
                    .toLowerCase()
                    .includes(searchText.toLowerCase().trim()) ||
                food.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase().trim())
            );
        }
    );

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

    // CheckoutItem
    function CheckoutItem({
        name,
        ingredients,
        onIngredientsUpdate
    }: {
        name: string;
        ingredients: string[];
        onIngredientsUpdate: (newIngredients: string[]) => void;
    }): JSX.Element {
        const [, drag] = useDrag(() => ({
            type: "removeItem",
            item: { name: name },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));

        const [editing, setEditing] = useState<boolean>(false);
        const [text, setText] = useState<string>(ingredients.join(", "));

        const handleEdit = () => {
            setEditing(true);
        };

        function handleAccept() {
            setEditing(false);
            const newIngredients: string[] = text
                .split(",")
                .map((ingredient: string) => ingredient.trim());
            onIngredientsUpdate(newIngredients);
        }

        const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
            setText(e.target.value);
        };

        return (
            <AccordionItem ref={drag}>
                <h2>
                    <AccordionButton
                        fontWeight="semibold"
                        _expanded={{ bg: "tomato", color: "white" }}
                    >
                        <Box as="span" flex="1" textAlign="center" ml={10}>
                            {name}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4} position="relative">
                    {editing ? (
                        <>
                            <FormControl>
                                <Input
                                    textAlign="center"
                                    value={text}
                                    onChange={handleTyping}
                                />
                            </FormControl>
                            <Button
                                onClick={handleAccept}
                                mt={3}
                                width={70}
                                height={8}
                                overflowWrap="break-word"
                                border="1px"
                                borderRadius="5px"
                                fontSize="16px"
                                fontWeight="semibold"
                                bg="tomato"
                                borderColor="red.600"
                                color="white"
                                _hover={{
                                    bg: "red.600",
                                    color: "white"
                                }}
                                _active={{
                                    bg: "red.300",
                                    transform: "scale(0.95)",
                                    borderColor: "orange"
                                }}
                            >
                                Accept
                            </Button>
                        </>
                    ) : (
                        <>
                            {ingredients.join(", ")}
                            <Button
                                onClick={handleEdit}
                                position="absolute"
                                top="8%"
                                right="2%"
                                width={70}
                                height={8}
                                overflowWrap="break-word"
                                border="1px"
                                borderRadius="5px"
                                fontSize="16px"
                                fontWeight="semibold"
                                bg="tomato"
                                borderColor="red.600"
                                color="white"
                                _hover={{
                                    bg: "red.600",
                                    color: "white"
                                }}
                                _active={{
                                    bg: "red.300",
                                    transform: "scale(0.95)",
                                    borderColor: "orange"
                                }}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </AccordionPanel>
            </AccordionItem>
        );
    }

    const handleIngredientsUpdate = (
        foodName: string,
        newIngredients: string[]
    ) => {
        const newCheckout = checkoutList.map((food: foodProps) => {
            if (food.name === foodName) {
                return {
                    ...food,
                    ingredients: newIngredients
                };
            } else {
                return food;
            }
        });
        setCheckoutList(newCheckout);
        sessionStorage.setItem("checkout", JSON.stringify(newCheckout));

        const currentUser: userProps = GetCurrentUser();
        const newCustomerList = ListOfCustomers().map((customer: userProps) =>
            customer.orderID === currentUser.orderID
                ? { ...customer, order: newCheckout }
                : customer
        );
        sessionStorage.setItem("customers", JSON.stringify(newCustomerList));
    };

    // DEBUGGING
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
                        h={window.innerHeight * 0.83}
                        w={window.innerWidth * 0.4}
                        border="5px solid tomato"
                        textAlign="center"
                    >
                        <CardHeader
                            ref={removeDrop}
                            // backgroundColor={isOver ? "red" : ""}
                        >
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Heading
                                    fontWeight="bold"
                                    flex={1}
                                    textAlign="center"
                                    ml={16}
                                >
                                    Checkout
                                </Heading>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    size="3x"
                                    style={{
                                        color: isOver ? "red" : "",
                                        border: "1px solid black",
                                        borderRadius: "50px",
                                        padding: "7px",
                                        boxSizing: "border-box"
                                    }}
                                />
                            </Flex>
                            <Center>
                                <FormControl
                                    id="search-checkout"
                                    data-testid="search-checkout"
                                    width="50%"
                                >
                                    <FormLabel textAlign="center" fontSize={15}>
                                        Search by Ingredient:
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Ingredient"
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                    />
                                </FormControl>
                            </Center>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody
                            ref={addDrop}
                            textAlign="center"
                            overflowY="auto"
                        >
                            <Accordion allowMultiple>
                                {searchedFoods.map(
                                    (food: foodProps, index: number) => (
                                        <CheckoutItem
                                            key={index + 1}
                                            name={food.name}
                                            ingredients={food.ingredients}
                                            onIngredientsUpdate={(
                                                newIngredients
                                            ) =>
                                                handleIngredientsUpdate(
                                                    food.name,
                                                    newIngredients
                                                )
                                            }
                                        ></CheckoutItem>
                                    )
                                )}
                            </Accordion>
                            <DeliveryDropDown></DeliveryDropDown>
                        </CardBody>
                    </Card>
                </Grid>
            </VStack>
        </Box>
    );
}
