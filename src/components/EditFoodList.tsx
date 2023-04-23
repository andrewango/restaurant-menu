import React, { useState } from "react";
//import { useEffect } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Divider,
    Heading,
    VStack,
    Text,
    IconButton,
    Icon,
    TabPanel,
    TabList,
    Tabs,
    TabPanels,
    Tab,
    FormControl,
    SimpleGrid,
    Button,
    GridItem,
    FormLabel,
    Input,
    Checkbox
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
    const [editFoodList, setEditFoodList] = useState<foodProps[]>(EditMenuList);
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
            setEditFoodList(newFoodList);
            sessionStorage.setItem("editFoodList", JSON.stringify(newFoodList));
        }
    };

    // Debugging
    //useEffect(() => {
    //  console.log(checkoutList);
    //}, [checkoutList]);

    return (
        <Card
            h="1050px"
            w="500px"
            ref={drop}
            border="1px solid black"
            textAlign="center"
        >
            <CardHeader>
                <Heading fontWeight="bold">Edit Food</Heading>
            </CardHeader>
            <Divider></Divider>
            <CardBody textAlign="center">
                <Tabs size="md" variant="enclosed">
                    <TabList>
                        {EditMenuList().map(
                            (food: foodProps, index: number) => (
                                <Tab key={index}>{food.name}</Tab>
                            )
                        )}
                    </TabList>

                    <TabPanels>
                        {editFoodList.map((food: foodProps, index: number) => (
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
                        ))}
                    </TabPanels>
                </Tabs>
            </CardBody>
        </Card>
    );
}
