import React, { useState } from "react";
import {
    Image,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    HStack,
    Center
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input } from "@chakra-ui/react";

import { userProps } from "../interfaces/User";
import { foodProps } from "../interfaces/Food";
import { ListOfCustomers } from "./SelectRole";
import Delete from "../assets/DeleteButton.png";
import "./Styles.css";

export default function AddDeleteUsers(): JSX.Element {
    const customers: userProps[] = ListOfCustomers();
    const [customerList, setCustomerList] = useState<userProps[]>(customers);

    const [name, setName] = useState<string>("");

    const storageOrderID: string | null = sessionStorage.getItem("orderID");
    const orderNum: number = storageOrderID ? parseInt(storageOrderID) : 2;
    const [orderID, setOrderID] = useState<number>(orderNum);

    const [searchText, setSearchText] = useState<string>("");

    // If there's a food item input into the search box, then find all customers with that food item ; ELSE if search box is empty, return all the customers.
    const customersWithSearchText: userProps[] = customers.filter(
        (customer: userProps): boolean => {
            return (
                searchText === "" ||
                customer.order.some((food: foodProps) =>
                    food.name
                        .toLowerCase()
                        .includes(searchText.toLowerCase().trim())
                )
            );
        }
    );

    const handleAddSubmit = () => {
        if (name !== "") {
            const newCustomer: userProps = {
                name: name,
                orderID: orderID,
                order: [],
                role: "Customer"
            };
            let newID: number = orderID;
            newID++;
            // Update incremented order ID when we are on the page
            setOrderID(newID);
            // Set the ID we were on in case we leave the page
            sessionStorage.setItem("orderID", newID.toString());

            const newUserList: userProps[] = customerList.map(
                (customer: userProps) => customer
            );
            setCustomerList([...newUserList, newCustomer]);
            sessionStorage.setItem(
                "customers",
                JSON.stringify([...newUserList, newCustomer])
            );
            setName("");
        }
    };

    const handleDeleteSubmit = (orderIDToDelete: number) => {
        // Find the index in the customer list of who we want to delete
        const customerToRemoveIndex = customerList.findIndex(
            (customer: userProps): boolean =>
                customer.orderID === orderIDToDelete
        );
        if (customerToRemoveIndex > -1) {
            // Remove the customer from the customer list
            customerList.splice(customerToRemoveIndex, 1);
            // Decrement the orderIDs accordingly
            const newCustomerList: userProps[] = customerList.map(
                (customer: userProps) => {
                    if (customer.orderID > orderIDToDelete) {
                        return {
                            ...customer,
                            orderID:
                                customer.orderID === 1
                                    ? 1
                                    : customer.orderID - 1
                        };
                    } else {
                        return customer;
                    }
                }
            );

            // Update decremented order ID when we are on the page
            setOrderID(orderID === 1 ? 1 : orderID - 1);
            // Set the ID we were on in case we leave the page
            sessionStorage.setItem("orderID", orderID.toString());

            // Set our new customer list
            setCustomerList(newCustomerList);
            sessionStorage.setItem(
                "customers",
                JSON.stringify(newCustomerList)
            );
        }
    };

    return (
        <div style={{ padding: 10 }}>
            <HStack maxWidth="100vw">
                <Center>
                    <FormControl
                        isRequired
                        id="add"
                        className="edituser-form"
                        width="800%"
                    >
                        <FormLabel>Name:</FormLabel>
                        <Input
                            type="text"
                            placeholder="Customer name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>
                    <FormControl id="search" width="1100%" mt={10} ml="28.3vw">
                        <FormLabel textAlign="center">
                            Search by Food:
                        </FormLabel>
                        <Input
                            type="text"
                            placeholder="Food name"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </FormControl>
                </Center>
            </HStack>
            <br></br>
            <Box
                as="button"
                type="submit"
                onClick={handleAddSubmit}
                id="add-customer"
                className="edituser-btn"
            >
                Add Customer
            </Box>
            <hr></hr>
            <div>
                <TableContainer maxWidth="100%" whiteSpace="normal">
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th isNumeric>#</Th>
                                <Th>Order</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {customersWithSearchText.map(
                                (customer: userProps) => {
                                    return (
                                        <Tr key={customer.orderID}>
                                            <Td
                                                fontWeight="semibold"
                                                width="30%"
                                            >
                                                <Box
                                                    as="button"
                                                    type="submit"
                                                    className="edituser-remove"
                                                    onClick={() =>
                                                        handleDeleteSubmit(
                                                            customer.orderID
                                                        )
                                                    }
                                                    id="remove-customer"
                                                    data-testid="remove-customer"
                                                >
                                                    <Image
                                                        src={Delete}
                                                        alt="delete-button"
                                                    ></Image>
                                                </Box>
                                                {customer.name}
                                            </Td>
                                            <Td isNumeric>
                                                {customer.orderID}
                                            </Td>
                                            <Td>
                                                {customer.order.map(
                                                    (food: foodProps) =>
                                                        food.name + ", "
                                                )}
                                            </Td>
                                        </Tr>
                                    );
                                }
                            )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
