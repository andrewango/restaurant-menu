import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import ItemListUI from "./ItemListUI";
import { Checkbox, HStack } from "@chakra-ui/react";
import { MenuList } from "../pages/AddFood";

export function SearchBar(): JSX.Element {
    const [foods, setFoods] = useState<foodProps[]>(MenuList());
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<foodProps[]>(foods);
    const [spicy, setSpicy] = useState<boolean>(false);
    const [popular, setPopular] = useState<boolean>(false);
    const [high, setHigh] = useState<boolean>(false);
    const [low, setLow] = useState<boolean>(false);
    const [appetizer, setAppetizer] = useState<boolean>(false);
    const [entree, setEntree] = useState<boolean>(false);
    const [dessert, setDessert] = useState<boolean>(false);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setFoods(MenuList());
    }, []);

    useEffect(() => {
        setListHelper(text);
    }, [spicy, popular, high, low, appetizer, entree, dessert]);

    function checkPrice(foods: foodProps[]) {
        if (!high && !low) {
            return checkFoodType(foods);
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

    function setListHelper(text: string) {
        if (text === "" && !spicy && !popular) {
            setList(checkPrice(foods));
        } else {
            text = text.toLowerCase();
            console.log(foods);
            setList(
                checkPrice(
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
        <div>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label style={{ color: "white" }}>
                    Search for Food
                </Form.Label>
                <Form.Control
                    value={text}
                    onChange={(e) => {
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <HStack pl={6} mt={1} spacing={5}>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-spicy-check"
                    checked={spicy}
                    onChange={() => {
                        setSpicy(!spicy);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Spicy
                </Checkbox>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-popular-check"
                    checked={popular}
                    onChange={() => {
                        setPopular(!popular);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Popular
                </Checkbox>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-appetizer-check"
                    checked={appetizer}
                    onChange={() => {
                        setAppetizer(!appetizer);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Appetizers
                </Checkbox>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-entree-check"
                    checked={entree}
                    onChange={() => {
                        setEntree(!entree);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Entree
                </Checkbox>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-dessert-check"
                    checked={dessert}
                    onChange={() => {
                        setDessert(!dessert);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Dessert
                </Checkbox>
            </HStack>
            <HStack pl={6} mt={1} spacing={1}>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-high2low-check"
                    checked={high}
                    onChange={() => {
                        setHigh(!high);
                        setLow(false);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Sort Price: High to Low
                </Checkbox>
                <Checkbox
                    style={{ color: "white" }}
                    type="checkbox"
                    id="is-low2high-check"
                    checked={low}
                    onChange={() => {
                        setHigh(false);
                        setLow(!low);
                        setListHelper(text);
                    }}
                    colorScheme="white"
                >
                    Sort Price: Low to High
                </Checkbox>
            </HStack>

            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
