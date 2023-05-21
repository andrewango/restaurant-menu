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

// THIS COMPONENT PROVIDES FUNCTIONALITY AND RENDERS THE TABLE FOR ADDING AND DELETING CUSTOMERS FROM THE CUSTOMER LIST
export default function AddDeleteUsers(): JSX.Element {
    // Declare our state variables for current customer list, current order ID, and for the search bar
    const customers: userProps[] = ListOfCustomers();
    const [customerList, setCustomerList] = useState<userProps[]>(customers);

    const [name, setName] = useState<string>("");

    const storageOrderID: string | null = sessionStorage.getItem("orderID");
    const orderNum: number = storageOrderID
        ? parseInt(storageOrderID)
        : customers.length > 0
        ? 2
        : 1;
    const [orderID, setOrderID] = useState<number>(orderNum);

    const [searchText, setSearchText] = useState<string>("");

    // If there's a food item input into the search box, then find all customers with that food item; ELSE if search box is empty, return all the customers.
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

    // When we submit the add customer button, this function will add a new customer to the customer list with a new order ID.
    const handleAddSubmit = () => {
        // Only run this if the input form is non-empty
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

    // When we click the trash icon to delete a customer, the customer will be removed from the customer list and the order IDs of all other customers will adjust.
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

    // Return our table of customers
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
                    <Table data-testid="edit-users-table" variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th isNumeric>#</Th>
                                <Th>Order</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {customersWithSearchText.map(
                                // Make a new array of the each customer's order with the quantity of each food item in their order
                                (customer: userProps) => {
                                    const displayOrder: foodProps[] =
                                        customer.order.reduce(
                                            (
                                                newOrderToDisplay: foodProps[],
                                                foodItem: foodProps
                                            ) => {
                                                const existingItemIndex =
                                                    newOrderToDisplay.findIndex(
                                                        (
                                                            existingItem: foodProps
                                                        ) =>
                                                            existingItem.name ===
                                                            foodItem.name
                                                    );
                                                // If item is not already in the order to display, then add it
                                                if (existingItemIndex === -1) {
                                                    return [
                                                        ...newOrderToDisplay,
                                                        foodItem
                                                    ];
                                                }
                                                return newOrderToDisplay;
                                            },
                                            []
                                        );

                                    return (
                                        <Tr
                                            data-testid={
                                                "Edit User - " +
                                                customer.orderID
                                            }
                                            key={customer.orderID}
                                        >
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
                                                    />
                                                </Box>
                                                {customer.name}
                                            </Td>
                                            <Td isNumeric>
                                                {customer.orderID}
                                            </Td>
                                            <Td
                                                data-testid={
                                                    "Edit User Checkout List - " +
                                                    customer.orderID
                                                }
                                            >
                                                {
                                                    // If the quantity is greater than 1, show quantity, BUT if it's 1, then just show the name to avoid repetitiveness
                                                    displayOrder.map(
                                                        (food: foodProps) =>
                                                            food.quantity > 1
                                                                ? `${food.name}: ${food.quantity}, `
                                                                : `${food.name}, `
                                                    )
                                                }
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
