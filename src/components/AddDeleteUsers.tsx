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
    Box,
    Flex
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input } from "@chakra-ui/react";

import { userProps } from "../interfaces/User";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { ListOfCustomers } from "./SelectRole";

export default function AddDeleteUsers(): JSX.Element {
    const customers: userProps[] = ListOfCustomers();
    const [customerList, setCustomerList] = useState<userProps[]>(customers);

    const [name, setName] = useState<string>("");

    const storageOrderID: string | null = sessionStorage.getItem("orderID");
    const orderNum: number = storageOrderID ? parseInt(storageOrderID) : 1;
    const [orderID, setOrderID] = useState<number>(orderNum);

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
        }
    };

    const handleDeleteDrop = (orderID: number) => {
        // Remove the customer from the customer list
        const customerToRemoveIndex = customerList.findIndex(
            (customer: userProps): boolean => customer.orderID === orderID
        );
        if (customerToRemoveIndex > -1) {
            const newCustomerList: userProps[] = customerList.map(
                (customer: userProps) => ({
                    ...customer,
                    orderID: orderID === 1 ? 1 : orderID - 1
                })
            );
            customerList.splice(customerToRemoveIndex, 1);
            sessionStorage.setItem(
                "customers",
                JSON.stringify(newCustomerList)
            );

            // Update decremented order ID when we are on the page
            setOrderID(orderID === 1 ? 1 : orderID - 1);
            // Set the ID we were on in case we leave the page
            sessionStorage.setItem("orderID", orderID.toString());

            // Set our new customer list
            setCustomerList([...newCustomerList]);
            sessionStorage.setItem(
                "customers",
                JSON.stringify([...newCustomerList])
            );
        }
        console.log(orderID);
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
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <FormControl isRequired id="name" width="500px" px={20} mt={10}>
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
                onClick={handleAddSubmit}
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
                            {customerList.map((customer: userProps) => {
                                return (
                                    <Tr key={customer.orderID}>
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
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}
