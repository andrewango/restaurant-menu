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
    Center,
    CardFooter,
    ButtonGroup,
    IconButton,
    Icon
} from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import { MenuList } from "./AddNewFood";
import { GetCurrentUser, ListOfCustomers } from "./SelectRole";
import { userProps } from "../interfaces/User";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import "./Styles.css";

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

    // Filter checkout list by search query (name, ingredients, description)
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
                    .includes(searchText.toLowerCase().trim()) ||
                food.desc
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
                const existingFoodIndex = checkoutList.findIndex(
                    (food) => food.name === name
                );

                const newFoodItem = {
                    ...chosenFood,
                    quantity: 1
                };
                const updatedCheckoutList = [...checkoutList, newFoodItem];

                // If the same food already exists in the checkout list, increase its quantity
                if (existingFoodIndex !== -1) {
                    updatedCheckoutList[existingFoodIndex].quantity += 1;
                    const indices = updatedCheckoutList
                        .map((food, index) => (food.name === name ? index : -1))
                        .filter((food) => food !== -1);

                    indices.forEach((index) => {
                        updatedCheckoutList[index].quantity =
                            updatedCheckoutList[existingFoodIndex].quantity;
                    });
                }

                sessionStorage.setItem(
                    "checkout",
                    JSON.stringify(updatedCheckoutList)
                );

                const listOfCustomers = ListOfCustomers();
                const currentUser: userProps = GetCurrentUser();
                const newUser: userProps = {
                    ...currentUser,
                    order: updatedCheckoutList
                };

                sessionStorage.setItem("user", JSON.stringify(newUser));

                const userIndex: number = listOfCustomers.findIndex(
                    (user: userProps) => newUser.orderID === user.orderID
                );

                if (userIndex > -1) {
                    listOfCustomers.splice(userIndex, 1, newUser);
                    sessionStorage.setItem(
                        "customers",
                        JSON.stringify(listOfCustomers)
                    );
                }

                return updatedCheckoutList;
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

                const indices = newCheckoutList
                    .map((food, index) => (food.name === name ? index : -1))
                    .filter((food) => food !== -1);

                indices.forEach((index) => {
                    newCheckoutList[index].quantity -= 1;
                });

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
        quantity,
        onIngredientsUpdate
    }: {
        name: string;
        ingredients: string[];
        quantity: number;
        onIngredientsUpdate: (newIngredients: string[]) => void;
    }): JSX.Element {
        const handleMinusClick = (name: string, quantity: number) => {
            if (quantity === 1) {
                removeFoodFromCheckoutList(name);
            } else {
                const existingFoodIndex = checkoutList.findIndex(
                    (food) => food.name === name
                );
                const updatedCheckoutList = [...checkoutList];
                updatedCheckoutList[existingFoodIndex].quantity -= 1;
                setCheckoutList(updatedCheckoutList);
                sessionStorage.setItem(
                    "checkout",
                    JSON.stringify(updatedCheckoutList)
                );
                const currentUser: userProps = GetCurrentUser();
                const newUser: userProps = {
                    ...currentUser,
                    order: updatedCheckoutList
                };
                sessionStorage.setItem("user", JSON.stringify(newUser));
                const userId = newUser.orderID;
                const newCustomerList = ListOfCustomers().map(
                    (customer: userProps) =>
                        customer.orderID === userId ? { ...newUser } : customer
                );
                sessionStorage.setItem(
                    "customers",
                    JSON.stringify(newCustomerList)
                );
            }
        };
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
            <AccordionItem data-testid={name + " - Checkout Item"} ref={drag}>
                <h2>
                    <AccordionButton
                        fontWeight="semibold"
                        _expanded={{ bg: "tomato", color: "white" }}
                    >
                        <Box as="span" flex="1" textAlign="center" ml={10}>
                            {name}
                        </Box>
                        <Box data-testid={name + " - Quantity"}>{quantity}</Box>
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
                                className="checkout-accept"
                            >
                                Accept
                            </Button>
                        </>
                    ) : (
                        <>
                            <Flex padding={0.5}>
                                <Box>
                                    {/* <ButtonGroup
                                        className="checkout-quantity"
                                        size="sm"
                                        isAttached
                                    >
                                        <IconButton
                                            data-testid="increment-button"
                                            onClick={() =>
                                                addFoodToCheckoutList(name)
                                            }
                                            className="checkout-button"
                                            aria-label="Increase quantity"
                                            icon={
                                                <Icon
                                                    as={AddIcon}
                                                    fontSize="11px"
                                                />
                                            }
                                        ></IconButton>
                                        <IconButton
                                            data-testid="decrement-button"
                                            onClick={() =>
                                                handleMinusClick(name, quantity)
                                            }
                                            className="checkout-button"
                                            aria-label="Decrease quantity"
                                            icon={
                                                <Icon
                                                    as={MinusIcon}
                                                    fontSize="11px"
                                                />
                                            }
                                        ></IconButton>
                                    </ButtonGroup> */}
                                </Box>

                                <Box className="checkout-edit-box">
                                    {ingredients.join(", ")}
                                </Box>
                                <Box width="90px">
                                    <Button
                                        onClick={handleEdit}
                                        className="checkout-edit"
                                    >
                                        Edit
                                    </Button>
                                </Box>
                            </Flex>
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
        <Box h="0.72vh" mt={100} zIndex="1" position="absolute">
            <VStack spacing="3px">
                <Grid
                    templateColumns={
                        isLargerThan2000 ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
                    }
                    rowGap={3}
                >
                    <Card className="checkout-card">
                        <CardHeader>
                            <Flex
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Heading className="checkout-card-head">
                                    Checkout
                                </Heading>
                                <FontAwesomeIcon
                                    data-testid="checkout-trash"
                                    ref={removeDrop}
                                    icon={faTrash}
                                    className="trashcan"
                                    size="3x"
                                    style={{
                                        color: isOver ? "red" : ""
                                    }}
                                />
                            </Flex>
                            <Center>
                                <FormControl
                                    id="search-checkout"
                                    data-testid="search-checkout"
                                    width="50%"
                                >
                                    <FormLabel
                                        textAlign="center"
                                        fontSize={15}
                                        ml={10}
                                    >
                                        Search Food:
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        placeholder="Name/Ingredient/Description"
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                        textAlign="center"
                                        ml={2}
                                    />
                                </FormControl>
                            </Center>
                        </CardHeader>
                        <Divider></Divider>
                        <CardBody
                            data-testid="checkout-list"
                            ref={addDrop}
                            textAlign="center"
                            overflowY="auto"
                        >
                            <Accordion allowToggle allowMultiple>
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
                                            quantity={food.quantity}
                                        ></CheckoutItem>
                                    )
                                )}
                            </Accordion>
                        </CardBody>
                        <Divider></Divider>
                        <CardFooter height={100}></CardFooter>
                    </Card>
                </Grid>
            </VStack>
        </Box>
    );
}
