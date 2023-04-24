import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { userProps } from "../interfaces/User";

const Select = styled.select`
    margin-left: 5px;
    text-align: center;
    display: inline-block;
    width: 115px;
    padding: 3px 0px;
    font-size: inherit;
    line-height: inherit;
    border: 1px solid;
    border-radius: 10px;
    color: inherit;
    background-color: transparent;
`;

export function SelectRole(): JSX.Element {
    // Constant values for Owner and Employee
    const ROLES: userProps[] = [
        { name: "Owner", orderID: 0, order: [], role: "Owner" },
        { name: "Employee", orderID: -1, order: [], role: "Employee" }
    ];

    // Get current user state from our session
    const user = sessionStorage.getItem("user");
    const userToParse =
        user !== null && user !== undefined ? user : JSON.stringify(ROLES[0]);
    const currentUser: userProps = userToParse
        ? JSON.parse(userToParse)
        : ROLES[0];

    const [userRole, setUserRole] = useState<userProps>(ROLES[0]);

    // Change role and update session state
    function changeRole(userRole: userProps) {
        sessionStorage.setItem("user", JSON.stringify(userRole));
        setUserRole(userRole);
    }

    // Get our list of customers from EDIT USERS page
    function ListOfCustomers() {
        const customers = sessionStorage.getItem("customers");
        const customersToParse =
            customers !== null && customers !== undefined ? customers : "";
        return customersToParse ? JSON.parse(customersToParse) : [];
    }

    const listOfCustomers: userProps[] = ListOfCustomers();

    // Find the selected option (owner, employee, or some user)
    function findUserInList(name: string) {
        let foundUser: userProps | undefined = listOfCustomers.find(
            (user) => name === user.name
        );
        if (foundUser) {
            return foundUser;
        } else {
            foundUser = ROLES.find((user) => name === user.name);
            return foundUser ? foundUser : ROLES[0];
        }
    }

    return (
        <div>
            <form>
                <label> Your Role </label>
                <Select
                    onChange={(e) => changeRole(findUserInList(e.target.value))}
                    name={userRole.name}
                    value={userRole.name}
                    id={userRole.name}
                    key={userRole.orderID}
                >
                    {ROLES.map((user: userProps) => (
                        <option
                            style={{ color: "black" }}
                            value={user.name}
                            key={user.orderID}
                            id={user.name}
                        >
                            {user.name}
                        </option>
                    ))}

                    {listOfCustomers.map((customer: userProps) => (
                        <option
                            style={{ color: "black" }}
                            value={customer.name}
                            key={customer.orderID}
                            id={customer.name}
                        >
                            {customer.name}
                        </option>
                    ))}
                </Select>
                {(currentUser.role === "Owner" || currentUser === null) && (
                    <Stack
                        px={10}
                        py={3}
                        spacing={3}
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
                            variant="solid"
                        >
                            edit users
                        </Button>
                    </Stack>
                )}
                {currentUser.role === "Employee" && (
                    <Stack
                        px={10}
                        py={3}
                        spacing={3}
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
                    </Stack>
                )}
            </form>
        </div>
    );
}
