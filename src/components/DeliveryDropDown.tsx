import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
//import styled from "styled-components";
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
    /*
    const Button = styled.button`
        background-color: #ef5350;
        color: white;
        font-size: 20px;
        padding: 10px 60px;
        border-radius: 5px;
        margin: 10px 0px;
        cursor: pointer;
        transition="background-color 0.3s ease"
    `;
    */
    return (
        <Box width="90%" position="absolute" bottom="0" mb="3">
            <p
                className="del-time"
                style={{ color: "black", textAlign: "left" }}
            >
                Delivery Time:
            </p>
            <div className="delivery">
                <form>
                    <Form.Group controlId="delivery-dropdown">
                        <Form.Select
                            style={{
                                width: "160px",
                                marginRight: "380px"
                            }}
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
                <Button
                    bg="red.400"
                    as="span"
                    fontWeight="bold"
                    color="white"
                    rightIcon={<AiOutlineShoppingCart />}
                    px={1}
                    py={1}
                    transition="background-color 0.3s ease"
                    _hover={{ bgColor: "red.600", color: "white" }}
                    borderRadius="md"
                    onClick={() =>
                        alert("Ordered placed! Your delivery time is " + time)
                    }
                >
                    Checkout
                </Button>
            </div>
        </Box>
    );
}
