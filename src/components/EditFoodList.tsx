import React, { useState } from "react";
//import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Heading,
    TabList,
    Tabs,
    TabPanels,
    Tab,
    Flex
} from "@chakra-ui/react";

import { useDrag, useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import EditFoodTabs from "./EditFoodTabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./EditFoodStyles.css";
import "./Styles.css";

// HELPER FUNCTION TO RETRIEVE EDIT MENU LIST (DIFFERENT FROM CENTRAL ITEM LIST)
export function EditMenuList() {
    const editMenu = sessionStorage.getItem("editFoodList");
    const editMenuToParse =
        editMenu !== null && editMenu !== undefined ? editMenu : "";
    return editMenuToParse ? JSON.parse(editMenuToParse) : [];
}

export default function EditFoodList(): JSX.Element {
    const [, drop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToEditFoodList(item.name),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    // DROP STATE TO REMOVE FOOD TAB
    const [{ isOver }, removeDrop] = useDrop(() => ({
        accept: "removeItem",
        drop: (item: foodProps) => {
            removeFoodToEditFoodList(item.name);
            console.log(item);
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }));

    // GET THE CENTRAL MENU ITEM LIST
    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foodlist = menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;

    const foods: foodProps[] = foodlist.map(
        (foodItem: foodProps): foodProps => foodItem
    );

    // ADDING A FOOD TAB
    const addFoodToEditFoodList = (name: string) => {
        const chosenFood = foods.find((foodItem) => name === foodItem.name);
        if (
            chosenFood &&
            EditMenuList().find(
                (foodItem: foodProps) => chosenFood.name === foodItem.name
            ) === undefined
        ) {
            const copy = EditMenuList();
            const newFoodList: foodProps[] = [...copy, chosenFood];
            sessionStorage.setItem("editFoodList", JSON.stringify(newFoodList));
        }
    };

    // REMOVING A FOOD TAB
    const removeFoodToEditFoodList = (name: string) => {
        const chosenFood = EditMenuList().find(
            (foodItem: foodProps) => name === foodItem.name
        );
        if (chosenFood) {
            const newFoods: foodProps[] = EditMenuList().map(
                (food: foodProps): foodProps => ({
                    ...food,
                    type: [...food.type],
                    ingredients: [...food.ingredients]
                })
            );
            const foodIndex = EditMenuList().findIndex(
                (food: foodProps): boolean => food.name === chosenFood.name
            );
            if (foodIndex > -1) {
                newFoods.splice(foodIndex, 1);
            }
            console.log(newFoods);
            sessionStorage.setItem("editFoodList", JSON.stringify(newFoods));
            console.log(sessionStorage.getItem("editFoodList"));
        }
    };

    // KEEP STATE FOR WHICH FOOD TAB WE'RE CURRENTLY ON
    const tab = sessionStorage.getItem("tab");
    const tabToParse = tab !== null && tab !== undefined ? tab : 0;
    const [tabIndex, setTabIndex] = useState<number>(
        tabToParse ? JSON.parse(tabToParse) : 0
    );

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
        sessionStorage.setItem("tab", JSON.stringify(index));
    };

    function FoodItem({ name }: { name: string }): JSX.Element {
        const [, drag] = useDrag(() => ({
            type: "removeItem",
            item: { name: name },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));
        return (
            <Tab ref={drag} backgroundColor="">
                {name}
            </Tab>
        );
    }

    return (
        <Card
            data-testid="edit-food-list"
            h={EditMenuList().length >= 1 ? "cover" : "full"}
            minW="500px"
            className="editfood-card"
            ref={drop}
        >
            <CardHeader fontWeight="bold" alignItems="stretch">
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading className="editfood-card-head">Edit Food</Heading>
                    <FontAwesomeIcon
                        ref={removeDrop}
                        icon={faTrash}
                        className="trashcan"
                        size="3x"
                        style={{
                            color: isOver ? "red" : ""
                        }}
                        data-testid="trash-icon"
                    />
                </Flex>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center">
                <Tabs
                    size="md"
                    isFitted
                    variant="enclosed"
                    index={tabIndex}
                    onChange={handleTabsChange}
                >
                    <TabList
                        data-testid="tab-select"
                        className="section editfood-tablist"
                    >
                        {EditMenuList().map(
                            (food: foodProps, index: number) => (
                                <FoodItem
                                    key={index}
                                    name={food.name}
                                ></FoodItem>
                            )
                        )}
                    </TabList>

                    <TabPanels>
                        {EditMenuList().map(
                            (food: foodProps, index: number) => (
                                <EditFoodTabs
                                    key={index}
                                    editName={food.name}
                                    editImage={food.image}
                                    editDesc={food.desc}
                                    editRating={food.rating}
                                    editType={food.type}
                                    editIngredients={food.ingredients}
                                    editPopular={food.popular}
                                    editSpicy={food.spicy}
                                    editPrice={food.price}
                                    editQuantity={food.quantity}
                                    editId={food.id}
                                ></EditFoodTabs>
                            )
                        )}
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card>
    );
}
