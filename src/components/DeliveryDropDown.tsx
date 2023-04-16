import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { Form } from "react-bootstrap";

export function DeliveryDropDown(): JSX.Element {
    const [time, changeTime] = useState<string>("");
    const TIMES = [
        "12:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00"
    ];
    return (
        <div>
            <form>
                <Form.Group controlId="delivery-dropdown">
                    <Form.Select
                        onChange={(e) => changeTime(e.target.value)}
                        name={time}
                        value={time}
                        id={time}
                        key={time}
                    >
                        {TIMES.map((time: string) => (
                            <option value={time} key={time} id={time}>
                                {time}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
            </form>
        </div>
    );
}
