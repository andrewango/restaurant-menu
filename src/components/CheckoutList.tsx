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
    CardFooter
} from "@chakra-ui/react";
import { useDrag, useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import { MenuList } from "./AddNewFood";
import { GetCurrentUser, ListOfCustomers } from "./SelectRole";
import { userProps } from "../interfaces/User";
import "./Styles.css";

// HELPER FUNCTION TO RETRIEVE THE CURRENT USER'S CHECKOUT LIST FROM SESSIONSTORAGE
export function CurrentCheckoutList(): foodProps[] {
    const checkout: string | null = sessionStorage.getItem("checkout");
    const checkoutToParse =
        checkout !== null && checkout !== undefined ? checkout : "";
    return checkoutToParse ? JSON.parse(checkoutToParse) : [];
}

// RENDERS THE CHECKOUTLIST ON THE MAIN PAGE AND UPDATES STATE ACROSS ROUTING ACCORDINGLY
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
            // Get the menu window's "checkout" key from Session Storage
            const storage: string | null =
                window.sessionStorage.getItem("checkout");
            const storageCheckout: foodProps[] = storage
                ? JSON.parse(storage)
                : [];
            setCheckoutList(storageCheckout);
        };
        // Event listeners to run handleStorage() if "checkout" key is updated, which means that user role was changed
        window.addEventListener("checkoutUpdated", handleStorage);
        return () =>
            window.removeEventListener("checkoutUpdated", handleStorage);
    }, []);

    // DROP STATE FOR ADDING FOOD FROM THE MENU TO THE CHECKOUT LIST
    const [, addDrop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToCheckoutList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    // DROP STATE FOR REMOVING FOOD FROM CHECKOUT LIST BY DRAGGING TO TRASH CAN ICON
    const [{ isOver }, removeDrop] = useDrop(() => ({
        accept: "removeItem",
        drop: (item: foodProps) => {
            removeFoodFromCheckoutList(item.name, item.id);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    // Create a new copy of the menu list to avoid mutation
    const foods: foodProps[] = MenuList().map(
        (foodItem: foodProps): foodProps => foodItem
    );

    // THIS FUNCTION HANDLES ADDING THE FOOD TO THE CHECKOUTLIST STATE WHEN WE DRAG IT FROM THE MENU AND DROP IT INTO THE CHECKOUT BOX
    const addFoodToCheckoutList = (name: string) => {
        const chosenFood: foodProps | undefined = foods.find(
            (foodItem) => name === foodItem.name
        );

        // Check if the food to add is in the menu list (error handling)
        if (chosenFood) {
            setCheckoutList((checkoutList) => {
                // Create a copy of the chosen food with correct item ID to add to the checkout list (IMMUTABLE IMPLEMENTATION)
                const newFoodItem = {
                    ...chosenFood,
                    ingredients: [...chosenFood.ingredients],
                    type: [...chosenFood.type],
                    quantity: 1,
                    id:
                        checkoutList.length > 0
                            ? checkoutList[checkoutList.length - 1].id + 1
                            : 1
                };

                // Create a copy of our original checkout list with the new food item
                // and updated quantities if chosen food is a duplicate (IMMUTABLE IMPLEMENTATION)
                const updatedCheckoutList: foodProps[] = [
                    ...checkoutList.map((food: foodProps) => {
                        return {
                            ...food,
                            ingredients: [...food.ingredients],
                            type: [...food.type],
                            quantity:
                                food.name === name
                                    ? food.quantity + 1
                                    : food.quantity,
                            id: food.id
                        };
                    }),
                    newFoodItem
                ];

                //  Update our SessionStorage states
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

    // THIS FUNCTION HANDLES REMOVING FOOD FROM CHECKOUT STATE WHEN WE DRAG THE FOOD IN THE CHECKOUT LIST TO THE TRASH ICON ICON TO DELETE IT
    const removeFoodFromCheckoutList = (name: string, toRemoveId: number) => {
        setCheckoutList((updatedCheckout) => {
            // Find the existing food's index in the user's checkout list by its unique ID
            const foodToRemoveIndex = updatedCheckout.findIndex(
                (foodItem: foodProps): boolean => foodItem.id === toRemoveId
            );
            // If it's in the checkout list, then create a copy of the original list that doesn't have it
            if (foodToRemoveIndex > -1) {
                const newCheckoutList: foodProps[] = updatedCheckout.map(
                    (food: foodProps): foodProps => ({
                        ...food,
                        type: [...food.type],
                        ingredients: [...food.ingredients],
                        quantity:
                            food.name === name
                                ? food.quantity - 1
                                : food.quantity,
                        id: food.id > toRemoveId ? food.id - 1 : food.id
                    })
                );
                newCheckoutList.splice(foodToRemoveIndex, 1);

                // Set our SessionStorage states
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
                if (userIndex > -1) {
                    listOfCustomers.splice(userIndex, 1, newUser);
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

    // FUNCTION TO RENDER OUR CHECKOUT ITEM AND ITS "EDIT INGREDIENTS" FORM
    function CheckoutItem({
        id,
        name,
        ingredients,
        onIngredientsUpdate
    }: {
        id: number;
        name: string;
        ingredients: string[];
        quantity: number;
        onIngredientsUpdate: (newIngredients: string[]) => void;
    }): JSX.Element {
        // DRAGGING STATE
        const [, drag] = useDrag(() => ({
            type: "removeItem",
            item: { name: name, id: id },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));

        // States for the input form
        const [editing, setEditing] = useState<boolean>(false);
        const [text, setText] = useState<string>(ingredients.join(", "));

        const handleEdit = () => {
            setEditing(true);
        };

        // Update the ingredients when we input the form for the unique food item
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

        // Render our checkout item with the form component in it
        return (
            <AccordionItem data-testid={name + " - Checkout Item"} ref={drag}>
                <h2>
                    <AccordionButton
                        fontWeight="semibold"
                        _expanded={{ bg: "tomato", color: "white" }}
                    >
                        <Box as="span" flex="1" textAlign="center" ml={10}>
                            {`(${id}) ${name}`}
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
                                className="checkout-accept"
                            >
                                Accept
                            </Button>
                        </>
                    ) : (
                        <>
                            <Flex padding={0.5}>
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

    // FUNCTION TO UPDATE THE CHECKOUT LIST WHEN WE SUBMIT THE EDIT INGREDIENTS FORM
    const handleIngredientsUpdate = (
        foodId: number,
        newIngredients: string[]
    ) => {
        const newCheckout = checkoutList.map((food: foodProps) => {
            if (food.id === foodId) {
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

    // RENDER OUR CHECKOUT LIST AND ITS SEARCH BAR
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
                                                    food.id,
                                                    newIngredients
                                                )
                                            }
                                            quantity={food.quantity}
                                            id={food.id}
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
