import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import ItemListUI from "./ItemListUI";
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

/**
 * Component representing the search bar while checking sorting.
 * @returns JSX.Element representing the search bar component
 */

export function SearchBar(): JSX.Element {
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

    /**
     * Updates the name based on the input event.
     * @param event - The input event containing the updated value.
     */
    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setFoods(MenuList());
    }, []);

    useEffect(() => {
        setListHelper(text);
    }, [spicy, popular, high, low, rating, appetizer, entree, dessert]);

    /**
     * Sorts the given food array based on the given filter.
     * @param foods - array of food items.
     * @returns sorted array of food items
     */
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

    /**
     * Filters the food items based on selected food types (appetizer, entree, dessert).
     * @param foods - array of food items.
     * @returns array of food items sorted by type.
     */
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

    /**
     * Helper function used to update the list of food items based on the provided search text and filter options.
     * @param text - search text input from user
     */
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

    return (
        <div data-testid={"searchbar"}>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label className="filter">Search Menu</Form.Label>
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
                <Box className="filter">Filter: </Box>
                <Tag
                    className="tag"
                    backgroundColor={spicy ? "#f56565" : "#f1f1f166"}
                    onClick={() => {
                        setSpicy(!spicy);
                        setListHelper(text);
                    }}
                >
                    <TagLabel data-testid="spicy-filter-button">Spicy</TagLabel>
                </Tag>
                <Tag
                    className="tag"
                    backgroundColor={popular ? "#f56565" : "#f1f1f166"}
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
                    backgroundColor={appetizer ? "#f56565" : "#f1f1f166"}
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
                    backgroundColor={entree ? "#f56565" : "#f1f1f166"}
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
                    backgroundColor={dessert ? "#f56565" : "#f1f1f166"}
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
                    <Box className="filter">Sort By: </Box>
                    <Radio
                        data-testid="pricehightolow-filter-button"
                        colorScheme="red"
                        value="high"
                        textColor="white"
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
                            color={sort === "high" ? "white" : "#f1f1f199"}
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
                            color={sort === "low" ? "white" : "#f1f1f199"}
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
                            color={sort === "rating" ? "white" : "#f1f1f199"}
                            className="radio"
                        >
                            Rating
                        </Box>
                    </Radio>
                </HStack>
            </RadioGroup>

            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
