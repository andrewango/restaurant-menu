import React, { useEffect, useState } from "react";
import { ListOfCustomers } from "./SelectRole";
import { userProps } from "../interfaces/User";
import { foodProps } from "../interfaces/Food";
import { Form } from "react-bootstrap";

export function SearchBar(): JSX.Element {
    const [customers, setCustomers] = useState<userProps[]>(ListOfCustomers());
    const [text, setName] = useState<string>("");
    const [list, setList] = useState<userProps[]>(customers);

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    useEffect(() => {
        setCustomers(ListOfCustomers());
    }, []);

    function setListHelper(text: string) {
        if (text === "") {
            setList(customers);
        } else {
            text = text.toLowerCase();
            setList(
                customers.filter((x: userProps): boolean => {
                    const desc: string[] = x.order.map(
                        (food: foodProps): string => {
                            return food.name.toLowerCase();
                        }
                    );
                    return desc.includes(text);
                })
            );
        }
    }

    return (
        <div>
            <Form.Group controlId="formCorrectAnswer">
                <Form.Label style={{ color: "white" }}>
                    Search Customer Lists by Food Item
                </Form.Label>
                <Form.Control
                    value={text}
                    onChange={(e) => {
                        updateName(e as React.ChangeEvent<HTMLInputElement>);
                        setListHelper(e.target.value);
                    }}
                />
            </Form.Group>

            <div>
                <ItemListUI foodData={list}></ItemListUI>
            </div>
        </div>
    );
}
