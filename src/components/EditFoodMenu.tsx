import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import EditFoodUI from "./EditFoodUI";
import {
    Box,
    HStack,
    Radio,
    RadioGroup,
    Tag,
    TagLabel
} from "@chakra-ui/react";
import { MenuList } from "./AddNewFood";
import "./Styles.css";

export function EditFoodMenu(): JSX.Element {
    // States for our central menu display, input forms, and filters
    const [foods, setFoods] = useState<foodProps[]>(MenuList());
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<foodProps[]>(foods);
    const [spicy, setSpicy] = useState<boolean>(false);
    const [popular, setPopular] = useState<boolean>(false);
    const [high, setHigh] = useState<boolean>(false);
    const [low, setLow] = useState<boolean>(false);
    const [rating, setRating] = useState<boolean>(false);
    const [appetizer, setAppetizer] = useState<boolean>(false);
    const [entree, setEntree] = useState<boolean>(false);
    const [dessert, setDessert] = useState<boolean>(false);
    const [sort, setSort] = useState<string>("");

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setFoods(MenuList());
    }, []);

    useEffect(() => {
        setListHelper(text);
    }, [spicy, popular, high, low, rating, appetizer, entree, dessert]);

    // Sorting the prices
    function checkSorting(foods: foodProps[]) {
        if (!high && !low && !rating) {
            return checkFoodType(foods);
        } else if (rating) {
            const sortedFoods = [...foods].sort((a, b) => {
                return a.rating < b.rating ? 1 : -1;
            });
            return checkFoodType(sortedFoods);
        }
        const sortedFoods = [...foods].sort((a, b) => {
            if (high) {
                return a.price < b.price ? 1 : -1;
            } else if (low) {
                return a.price > b.price ? 1 : -1;
            }
            return 0;
        });
        return checkFoodType(sortedFoods);
    }

    // Filters for food type
    function checkFoodType(foods: foodProps[]) {
        if (!appetizer && !entree && !dessert) {
            return foods;
        }
        const resorted = [...foods].filter((x: foodProps): boolean => {
            const isAppetizer = appetizer && x.type.includes("Appetizer");
            const isEntree = entree && x.type.includes("Entree");
            const isDessert = dessert && x.type.includes("Dessert");

            return isAppetizer || isEntree || isDessert;
        });

        return resorted;
    }

    // FUNCTION TO FILTER OUR LIST ACCORDING TO THE FILTER STATES
    function setListHelper(text: string) {
        if (text === "" && !spicy && !popular) {
            setList(checkSorting(foods));
        } else {
            text = text.toLowerCase();
            console.log(foods);
            setList(
                checkSorting(
                    foods.filter((x: foodProps): boolean => {
                        const name = x.name.toLowerCase();
                        const desc = x.desc.toLowerCase();
                        const ingredients = x.ingredients.map((x) =>
                            x.toLowerCase()
                        );
                        const type = x.type.map((y) => y.toLowerCase());
                        if (spicy && popular) {
                            return (
                                (name.includes(text) ||
                                    desc.includes(text) ||
                                    ingredients.find((z) =>
                                        z.includes(text)
                                    ) !== undefined ||
                                    type.find((z) => z.includes(text)) !==
                                        undefined) &&
                                x.spicy === true &&
                                x.popular === true
                            );
                        } else if (spicy) {
                            return (
                                (name.includes(text) ||
                                    desc.includes(text) ||
                                    ingredients.find((z) =>
                                        z.includes(text)
                                    ) !== undefined ||
                                    type.find((z) => z.includes(text)) !==
                                        undefined) &&
                                x.spicy === true
                            );
                        } else if (popular) {
                            return (
                                (name.includes(text) ||
                                    desc.includes(text) ||
                                    ingredients.find((z) =>
                                        z.includes(text)
                                    ) !== undefined ||
                                    type.find((z) => z.includes(text)) !==
                                        undefined) &&
                                x.popular === true
                            );
                        } else {
                            return (
                                name.includes(text) ||
                                desc.includes(text) ||
                                ingredients.find((z) => z.includes(text)) !==
                                    undefined ||
                                type.find((z) => z.includes(text)) !== undefined
                            );
                        }
                    })
                )
            );
        }
    }

    // RENDER OUR CENTRAL MENU LIST ACCORDING TO APPLIED SEARCH QUERIES AND FILTERS
    // ALSO RENDERS OUR SEARCH BOX AND FILTER TAGS/RADIO BUTTONS
    return (
        <div data-testid={"editfoodmenu"}>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label className="edit-filter">Search Menu</Form.Label>
                <Form.Control
                    data-testid={"search-input"}
                    value={text}
                    onChange={(e) => {
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <HStack pl={6} mt={1} spacing={5}>
                <Box className="edit-filter">Filter: </Box>
                <Tag
                    className="tag"
                    backgroundColor={spicy ? "#f56565" : "#0e0e0e4d"}
                    onClick={() => {
                        setSpicy(!spicy);
                        setListHelper(text);
                    }}
                >
                    <TagLabel data-testid="spicy-filter-button">Spicy</TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={popular ? "#f56565" : "#0e0e0e4d"}
                    onClick={() => {
                        setPopular(!popular);
                        setListHelper(text);
                    }}
                >
                    <TagLabel data-testid="popular-filter-button">
                        Popular
                    </TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={appetizer ? "#f56565" : "#0e0e0e4d"}
                    onClick={() => {
                        setAppetizer(!appetizer);
                        setListHelper(text);
                    }}
                >
                    <TagLabel data-testid="appetizer-filter-button">
                        Appetizers
                    </TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={entree ? "#f56565" : "#0e0e0e4d"}
                    onClick={() => {
                        setEntree(!entree);
                        setListHelper(text);
                    }}
                >
                    <TagLabel data-testid="entree-filter-button">
                        Entree
                    </TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={dessert ? "#f56565" : "#0e0e0e4d"}
                    onClick={() => {
                        setDessert(!dessert);
                        setListHelper(text);
                    }}
                >
                    <TagLabel data-testid="dessert-filter-button">
                        Dessert
                    </TagLabel>
                </Tag>
            </HStack>
            <RadioGroup>
                <HStack pl={6} mt={1} spacing={5}>
                    <Box className="edit-filter">Sort By: </Box>
                    <Radio
                        data-testid="pricehightolow-filter-button"
                        colorScheme="red"
                        value="high"
                        textColor="black"
                        onChange={() => {
                            setHigh(true);
                            setLow(false);
                            setRating(false);
                            setListHelper(text);
                            setSort("high");
                        }}
                        hidden
                    >
                        <Box
                            color={sort === "high" ? "black" : "#0e0e0e80"}
                            className="radio"
                        >
                            Price: High to Low
                        </Box>
                    </Radio>
                    <Radio
                        data-testid="pricelowtohigh-filter-button"
                        colorScheme="red"
                        value="low"
                        textColor="white"
                        onChange={() => {
                            setHigh(false);
                            setLow(true);
                            setRating(false);
                            setListHelper(text);
                            setSort("low");
                        }}
                        hidden
                    >
                        <Box
                            color={sort === "low" ? "black" : "#0e0e0e80"}
                            className="radio"
                        >
                            Price: Low to High
                        </Box>
                    </Radio>
                    <Radio
                        data-testid="rating-filter-button"
                        colorScheme="red"
                        value="rating"
                        textColor="white"
                        onChange={() => {
                            setHigh(false);
                            setLow(false);
                            setRating(true);
                            setListHelper(text);
                            setSort("rating");
                        }}
                        hidden
                    >
                        <Box
                            color={sort === "rating" ? "black" : "#0e0e0e80"}
                            className="radio"
                        >
                            Rating
                        </Box>
                    </Radio>
                </HStack>
            </RadioGroup>
            <div data-testid="edit-food-central">
                <EditFoodUI foodData={list}></EditFoodUI>
            </div>
        </div>
    );
}
