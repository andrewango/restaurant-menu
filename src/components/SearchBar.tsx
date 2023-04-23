import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import ItemListUI from "./ItemListUI";
import { Checkbox, Stack } from "@chakra-ui/react";
import { MenuList } from "../pages/AddFood";

export function SearchBar(): JSX.Element {
    const [foods, setFoods] = useState<foodProps[]>(MenuList());
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<foodProps[]>(foods);
    const [spicy, setSpicy] = useState<boolean>(false);
    const [popular, setPopular] = useState<boolean>(false);
    const [high, setHigh] = useState<boolean>(false);
    const [low, setLow] = useState<boolean>(false);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setFoods(MenuList());
    }, []);

    useEffect(() => {
        setListHelper(text);
    }, [spicy, popular, high, low]);

    function checkPrice(foods: foodProps[]) {
        if (!high && !low) {
            return foods;
        }
        const sortedFoods = [...foods].sort((a, b) => {
            if (high) {
                return a.price < b.price ? 1 : -1;
            } else if (low) {
                return a.price > b.price ? 1 : -1;
            }
            return 0;
        });
        return sortedFoods;
    }

    function setListHelper(text: string) {
        if (text === "" && !spicy && !popular) {
            setList(checkPrice(foods));
        } else {
            console.log(foods);
            setList(
                checkPrice(
                    foods.filter((x: foodProps): boolean => {
                        if (spicy && popular) {
                            return (
                                (x.name.includes(text) ||
                                    x.desc.includes(text) ||
                                    x.ingredients.includes(text) ||
                                    x.type.includes(text)) &&
                                x.spicy === true &&
                                x.popular === true
                            );
                        } else if (spicy) {
                            return (
                                (x.name.includes(text) ||
                                    x.desc.includes(text) ||
                                    x.ingredients.includes(text) ||
                                    x.type.includes(text)) &&
                                x.spicy === true
                            );
                        } else if (popular) {
                            return (
                                (x.name.includes(text) ||
                                    x.desc.includes(text) ||
                                    x.ingredients.includes(text) ||
                                    x.type.includes(text)) &&
                                x.popular === true
                            );
                        } else {
                            return (
                                x.name.includes(text) ||
                                x.desc.includes(text) ||
                                x.ingredients.includes(text) ||
                                x.type.includes(text)
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
            <Stack pl={6} mt={1} spacing={1}>
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
            </Stack>

            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
