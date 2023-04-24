import React, { useState } from "react";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Stack,
    Spacer,
    Flex,
    Box
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/react";

import { userProps } from "../interfaces/User";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

export default function AddDeleteUsers(): JSX.Element {
    const [customerList, setCustomerList] = useState<userProps[]>([
        {
            name: "Cloud",
            orderID: 1,
            order: [
                {
                    name: "Pepperoni Pizza",
                    image: "https://live.staticflickr.com/65535/52813368763_7f334652e5_m.jpg",
                    desc: "A delicious pizza topped with cheese and pepperoni",
                    rating: 4,
                    type: ["Italian", "Fast Food", "Entree"],
                    ingredients: [
                        "Dough",
                        "Tomato Sauce",
                        "Cheese",
                        "Pepperoni"
                    ],
                    popular: true,
                    spicy: false,
                    price: 10
                }
            ],
            role: "Customer"
        },
        {
            name: "Tifa",
            orderID: 2,
            order: [
                {
                    name: "Pepperoni Pizza",
                    image: "https://live.staticflickr.com/65535/52813368763_7f334652e5_m.jpg",
                    desc: "A delicious pizza topped with cheese and pepperoni",
                    rating: 4,
                    type: ["Italian", "Fast Food", "Entree"],
                    ingredients: [
                        "Dough",
                        "Tomato Sauce",
                        "Cheese",
                        "Pepperoni"
                    ],
                    popular: true,
                    spicy: false,
                    price: 10
                }
            ],
            role: "Customer"
        },
        {
            name: "Aerith",
            orderID: 3,
            order: [
                {
                    name: "Pepperoni Pizza",
                    image: "https://live.staticflickr.com/65535/52813368763_7f334652e5_m.jpg",
                    desc: "A delicious pizza topped with cheese and pepperoni",
                    rating: 4,
                    type: ["Italian", "Fast Food", "Entree"],
                    ingredients: [
                        "Dough",
                        "Tomato Sauce",
                        "Cheese",
                        "Pepperoni"
                    ],
                    popular: true,
                    spicy: false,
                    price: 10
                },
                {
                    name: "Cheeseburger",
                    image: "https://live.staticflickr.com/65535/52812357442_e349d9cd4d_m.jpg",
                    desc: "A juicy burger with lettuce, tomato, and cheese",
                    rating: 4.1,
                    type: ["American", "Fast Food", "Entree"],
                    ingredients: [
                        "Beef Patty",
                        "Bun",
                        "Lettuce",
                        "Tomato",
                        "Cheese"
                    ],
                    popular: true,
                    spicy: false,
                    price: 15
                }
            ],
            role: "Customer"
        }
    ]);
    const [name, setName] = useState<string>("");

    const [orderID, setOrderID] = useState<number>(4);

    const handleSubmit = () => {
        const newCustomer: userProps = {
            name: name,
            orderID: orderID,
            order: [],
            role: "Customer"
        };
        let newID: number = orderID;
        newID++;
        setOrderID(newID);

        const newUserList: userProps[] = customerList.map(
            (customer: userProps) => customer
        );
        setCustomerList([...newUserList, newCustomer]);
    };

    return (
        <div style={{ padding: 10 }}>
            <Flex wrap="wrap">
                <Heading
                    display="flex"
                    justifyContent="center"
                    mt={8}
                    px={10}
                    fontSize="50px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    edit users
                </Heading>
                <Spacer></Spacer>
                <Stack
                    px={10}
                    py={3}
                    mb={5}
                    spacing={6}
                    direction="column"
                    textAlign="center"
                >
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="solid"
                    >
                        edit foods
                    </Button>
                    <Button
                        as={NavLink}
                        to="/EditUsers"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        edit users
                    </Button>
                </Stack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <FormControl id="name" width="500px" px={20} mt={10}>
                <FormLabel>Name:</FormLabel>
                <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <br></br>
            <Box
                as="button"
                type="submit"
                onClick={handleSubmit}
                id="add-customer"
                height="40px"
                lineHeight="2.1"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                border="1px"
                ml={20}
                px={10}
                borderRadius="5px"
                fontSize="16px"
                fontWeight="semibold"
                bg="red.500"
                borderColor="red.600"
                color="white"
                _hover={{ bg: "red.600", color: "white" }}
                _active={{
                    bg: "red.300",
                    transform: "scale(0.95)",
                    borderColor: "orange"
                }}
                _focus={{
                    boxShadow:
                        "0 0 2px 2px rgba(255, 30, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
            >
                Add Customer
            </Box>
            <hr></hr>
            <div>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th isNumeric>#</Th>
                                <Th>Order</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {customerList.map((customer: userProps) => (
                                <Tr key={customer.name}>
                                    <Td fontWeight="semibold">
                                        {customer.name}
                                    </Td>
                                    <Td isNumeric>{customer.orderID}</Td>
                                    <Td>
                                        {customer.order.map(
                                            (food: foodProps) =>
                                                food.name + ", "
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
