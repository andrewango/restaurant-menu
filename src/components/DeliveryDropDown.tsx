import {
    Box,
    HStack,
    Stack,
    StackDivider,
    useDisclosure
} from "@chakra-ui/react";
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
import { GetCurrentUser, ListOfCustomers } from "./SelectRole";
//import styled from "styled-components";
export function DeliveryDropDown(): JSX.Element {
    // Our time state and possible times
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

                const newCustomers: userProps[] = ListOfCustomers().map(
                    (customer: userProps) =>
                        customer.orderID === clearedUser.orderID
                            ? { ...customer, order: [] }
                            : customer
                );
                sessionStorage.setItem(
                    "customers",
                    JSON.stringify(newCustomers)
                );

                sessionStorage.setItem("checkout", JSON.stringify([]));
                window.dispatchEvent(new Event("checkoutUpdated"));
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
                    {
                        // The Modal is the pop up that shows when we click Place Order. The customer must respond to it
                        // by clicking OK to make sure they read it, which will reset the confirmed checkbox to FALSE.
                    }
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

    // Render the dropdown select for the times and the Place Order button and its confirmation checkbox
    return (
        <Stack w="35vw" alignItems="center">
            <Box h="63.5vh" mt="7.5vh"></Box>
            <Box id="delivery" className="ddd-box" maxW="sm">
                <p className="del-time ddd-text">Delivery Time:</p>
                <div className="delivery">
                    <form>
                        <Form.Group controlId="delivery-dropdown">
                            <Form.Select
                                className="ddd-select"
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
        </Stack>
    );
}
