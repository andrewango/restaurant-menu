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
    IconButton,
    Icon
} from "@chakra-ui/react";
import { useDrop } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import EditFoodTabs from "./EditFoodTabs";
import classes from "./EditFoodList.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y, Pagination } from "swiper";

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

    const [tabIndex, setTabIndex] = useState<number>(0);
    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTabIndex(parseInt(event.target.value, 10));
    };

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
    };

    const [swiper, setSwiper] = useState(null);

    return (
        <Card
            h="1050px"
            w="90%"
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
                />
                <Tabs
                    size="md"
                    isFitted
                    variant="enclosed"
                    index={tabIndex}
                    onChange={handleTabsChange}
                >
                    <TabList width="100%" overflow="clip">
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
