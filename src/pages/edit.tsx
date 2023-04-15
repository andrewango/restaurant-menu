import React, { useState, useRef } from "react";
import { Form } from "react-bootstrap";
import { foodProps } from "../interfaces/Food";
import foodList from "../data/foods.json";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input
} from "@chakra-ui/react";

export default function Edit() {
    const foods: foodProps[] = foodList.FOODS;
    const [food, setFood] = useState<foodProps>();
    //sessionStorage.setItem("foods", JSON.stringify(foods));
    const foodInputRef = useRef<HTMLInputElement>(null);

    type FoodFormProps = {
        onSubmit: (form: foodProps) => void;
    };

    function FoodForm({ onSubmit }: FoodFormProps) {
        const [form, setForm] = useState({
            name: "",
            image: "",
            desc: "",
            rating: 0,
            type: [],
            ingredients: [],
            popular: false,
            spicy: false
        });

        const { name, image, desc, rating, type, ingredients, popular, spicy } =
            form;

        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm({
                ...form,
                [name]: value
            });
        };

        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit(form);
            setForm({
                name: "",
                image: "",
                desc: "",
                rating: 0,
                type: [],
                ingredients: [],
                popular: false,
                spicy: false
            });
        };

        return (
            <form onSubmit={handleSubmit}>
                <input name="name" value={name} onChange={onChange} />
                <input name="image" value={image} onChange={onChange} />
                <input name="desc" value={desc} onChange={onChange} />
                <input name="rating" value={rating} onChange={onChange} />
                <input name="type" value={type} onChange={onChange} />
                <input
                    name="ingredients"
                    value={ingredients}
                    onChange={onChange}
                />
                <button type="submit">등록</button>
            </form>
        );
    }
    // Obly super and admin can access this page
    // Set list state to be the user list
    // if user is super, add delete edit will update Central state
    // if user is admin, can only edit will update Central state

    const onSubmit = (form: {
        name: string;
        image: string;
        desc: string;
        rating: number;
        type: string[];
        ingredients: string[];
        popular: boolean;
        spicy: boolean;
    }) => {
        foods;
    };
    return <FoodForm onSubmit={onSubmit} />;
}
