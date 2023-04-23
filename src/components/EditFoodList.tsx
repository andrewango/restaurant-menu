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
    Tab
} from "@chakra-ui/react";

import { useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import EditFoodTabs from "./EditFoodTabs";

export default function EditFoodList(): JSX.Element {
    function EditMenuList() {
        const editMenu = sessionStorage.getItem("editFoodList");
        const editMenuToParse =
            editMenu !== null && editMenu !== undefined ? editMenu : "";
        return editMenuToParse ? JSON.parse(editMenuToParse) : [];
    }
    const [, drop] = useDrop(() => ({
        accept: "foodItem",
        drop: (item: foodProps) => addFoodToEditFoodList(item.name),
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

    const tab = sessionStorage.getItem("tab");
    const tabToParse = tab !== null && tab !== undefined ? tab : 0;
    const [tabIndex, setTabIndex] = useState<number>(
        tabToParse ? JSON.parse(tabToParse) : 0
    );
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTabIndex(parseInt(event.target.value, 10));
    };

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
        sessionStorage.setItem("tab", JSON.stringify(index));
    };

    return (
        <Card
            h={
                EditMenuList().length !== 0
                    ? sessionStorage.getItem("user") === "Employee"
                        ? window.innerHeight * 0.75
                        : window.innerHeight * 0.65
                    : "700px"
            }
            w={window.innerWidth * 0.4}
            ref={drop}
            border="1px solid black"
            textAlign="center"
        >
            <CardHeader>
                <Heading fontWeight="bold">Edit Food</Heading>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center">
                <input
                    type="range"
                    min="0"
                    max={EditMenuList().length - 1}
                    value={tabIndex}
                    onChange={handleSliderChange}
                    color="red"
                    hidden={!(EditMenuList().length > 1)}
                />
                <Tabs
                    size="md"
                    isFitted
                    variant="enclosed"
                    index={tabIndex}
                    onChange={handleTabsChange}
                >
                    <TabList width="100%" overflowX="clip">
                        {EditMenuList().map(
                            (food: foodProps, index: number) => (
                                <Tab key={index}>{food.name}</Tab>
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
