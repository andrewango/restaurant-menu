import { Box, HStack, StackDivider, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

import { Button } from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Checkbox
} from "@chakra-ui/react";
import { userProps } from "../interfaces/User";
import { GetCurrentUser } from "./SelectRole";
//import styled from "styled-components";
export function DeliveryDropDown(): JSX.Element {
    const [time, changeTime] = useState<string>("12:00");
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

    function CheckoutButton() {
        const [confirmed, setConfirmed] = useState<boolean>(false);
        const { isOpen, onOpen, onClose } = useDisclosure();

        // Place order button can only be clicked if customer confirms the order, and clears the current customer's checkout list
        function handleOpen() {
            if (confirmed) {
                onOpen();
                const clearedUser: userProps = GetCurrentUser();
                clearedUser.order = [];
                sessionStorage.setItem("user", JSON.stringify(clearedUser));

                sessionStorage.setItem("checkout", JSON.stringify([]));
                window.dispatchEvent(new Event("checkoutUpdated"));
                console.log("Hi");
            }
        }

        // Uncheck the confirm checkbox when we close the modal
        function handleClose() {
            setConfirmed(!confirmed);
            onClose();
        }

        return (
            <>
                <div id="confirm-place-order">
                    <HStack
                        divider={<StackDivider borderColor="gray.200" />}
                        spacing="15px"
                        ml={-80}
                    >
                        <Checkbox
                            style={{ color: "black" }}
                            type="checkbox"
                            id="confirm-order-check"
                            isChecked={confirmed}
                            onChange={() => {
                                setConfirmed(!confirmed);
                            }}
                            colorScheme="red"
                        >
                            Confirm
                        </Checkbox>
                        <Button
                            id="place-order-button"
                            rightIcon={<AiOutlineShoppingCart />}
                            bg="red.400"
                            color="white"
                            _hover={{ bgColor: "red.600", color: "white" }}
                            ml={0}
                            onClick={handleOpen}
                        >
                            Place Order
                        </Button>
                    </HStack>
                    <Modal
                        id="order-placed-popup"
                        closeOnOverlayClick={false}
                        isOpen={isOpen}
                        onClose={handleClose}
                        size="sm"
                    >
                        <ModalOverlay />
                        <ModalContent textAlign="center">
                            <ModalHeader>Order placed!</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                Your delivery time is {time}.
                            </ModalBody>

                            <ModalFooter>
                                <Button
                                    bg="red.400"
                                    color="white"
                                    mr={3}
                                    _hover={{
                                        bgColor: "red.600",
                                        color: "white"
                                    }}
                                    onClick={handleClose}
                                >
                                    OK
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </div>
            </>
        );
    }

    return (
        <Box
            id="delivery"
            maxW="sm"
            width="90%"
            position="absolute"
            bottom="0"
            mb={10}
            ml={40}
        >
            <p
                className="del-time"
                style={{
                    color: "black",
                    textAlign: "left",
                    marginBottom: "7px"
                }}
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
                <CheckoutButton></CheckoutButton>
            </div>
        </Box>
    );
}
