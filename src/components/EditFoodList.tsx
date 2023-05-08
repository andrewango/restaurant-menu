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

    const menu = sessionStorage.getItem("menu");
    const menuToParse = menu !== null && menu !== undefined ? menu : "";
    const foodlist = menuToParse ? JSON.parse(menuToParse) : foodList.FOODS;

    const foods: foodProps[] = foodlist.map(
        (foodItem: foodProps): foodProps => foodItem
    );

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
            h={EditMenuList().length >= 1 ? "cover" : "full"}
            className="editfood-card"
            ref={drop}
        >
            <CardHeader fontWeight="bold" alignItems="stretch" ref={removeDrop}>
                <Flex alignItems="center" justifyContent="space-between">
                    <Heading className="editfood-card-head">Edit Food</Heading>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="trashcan"
                        size="3x"
                        style={{
                            color: isOver ? "red" : ""
                        }}
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
                    <TabList className="section editfood-tablist">
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
                                ></EditFoodTabs>
                            )
                        )}
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card>
    );
}
