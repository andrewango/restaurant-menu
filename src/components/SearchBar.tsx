import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import ItemListUI from "./ItemListUI";

export function SearchBar(): JSX.Element {
    const temp = sessionStorage.getItem("menu");
    const foodlist =
        temp === null || temp === undefined ? foodList.FOODS : JSON.parse(temp);
    const [foods, setFoods] = useState<foodProps[]>(foodlist);
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
        setFoods(foodlist);
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
                <Form.Label>Search for Food</Form.Label>
                <Form.Control
                    value={text}
                    onChange={(e) => {
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <Form.Check
                type="checkbox"
                id="is-spicy-check"
                label="Spicy"
                checked={spicy}
                onChange={() => {
                    setSpicy(!spicy);
                    setListHelper(text);
                }}
            />
            <Form.Check
                type="checkbox"
                id="is-popular-check"
                label="Popular"
                checked={popular}
                onChange={() => {
                    setPopular(!popular);
                    setListHelper(text);
                }}
            />
            <Form.Check
                type="checkbox"
                id="is-high2low-check"
                label="Sort Price: High to Low"
                checked={high}
                onChange={() => {
                    setHigh(!high);
                    setLow(false);
                    setListHelper(text);
                }}
            />
            <Form.Check
                type="checkbox"
                id="is-low2high-check"
                label="Sort Price: Low to High"
                checked={low}
                onChange={() => {
                    setHigh(false);
                    setLow(!low);
                    setListHelper(text);
                }}
            />
            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
