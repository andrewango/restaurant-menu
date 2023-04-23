import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import EditFoodUI from "./EditFoodUI";

export function EditFoodMenu(): JSX.Element {
    const temp = sessionStorage.getItem("menu");
    const foodlist =
        temp === null || temp === undefined ? foodList.FOODS : JSON.parse(temp);
    const [foods, setFoods] = useState<foodProps[]>(foodlist);
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<foodProps[]>(foods);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setFoods(foodlist);
    }, []);

    function setListHelper(text: string) {
        if (text === "") {
            setList(foods);
        } else {
            console.log(foods);
            setList(
                foods.filter((x: foodProps): boolean => {
                    return (
                        x.name.includes(text) ||
                        x.desc.includes(text) ||
                        x.ingredients.includes(text) ||
                        x.type.includes(text)
                    );
                })
            );
        }
    }

    return (
        <div>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label>Search Menu</Form.Label>
                <Form.Control
                    value={text}
                    onChange={(e) => {
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>
            <div>
                <EditFoodUI foodData={list}></EditFoodUI>
            </div>
        </div>
    );
}
