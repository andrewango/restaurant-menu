import React, { useState } from "react";
import styled from "styled-components";
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

// Constant values for Owner and Employee
const ROLES: userProps[] = [
    { name: "Owner", orderID: -1, order: [], role: "Owner" },
    { name: "Employee", orderID: 0, order: [], role: "Employee" }
];

const defaultCustomer: userProps = {
    name: "Customer",
    orderID: 1,
    order: [],
    role: "Customer"
};
//sessionStorage.setItem("customers", JSON.stringify([defaultCustomer]));

/**
 * Gets current user from session storage.
 * @returns current user object
 */
export function GetCurrentUser() {
    const user = sessionStorage.getItem("user");
    const userToParse =
        user !== null && user !== undefined
            ? user
            : JSON.stringify(defaultCustomer);
    return userToParse ? JSON.parse(userToParse) : defaultCustomer;
}

/**
 * Get our array of customers from EDIT USERS page.
 * @returns array of customers from session storage OR default customer array.
 */
export function ListOfCustomers() {
    const customers = sessionStorage.getItem("customers");
    const customersToParse =
        customers !== null && customers !== undefined ? customers : "";
    return customersToParse ? JSON.parse(customersToParse) : [defaultCustomer];
}

/**
 * Component that  renders a dropdown menu that allows users to select different roles.
 * @returns The JSX element representing the role selection component.
 */

export function SelectRole(): JSX.Element {
    // Get current user state from our session
    const currentUser: userProps = GetCurrentUser();

    const [userRole, setUserRole] = useState<userProps>(currentUser);

    /**
     * Changes user role and update session state
     * @param userRole - new role to set
     */
    function changeRole(userRole: userProps) {
        setUserRole(userRole);
        sessionStorage.setItem("user", JSON.stringify(userRole));
        if (GetCurrentUser().role === "Customer") {
            location.hash = "/";
            sessionStorage.setItem("checkout", JSON.stringify(userRole.order));
            // Manually dispatches an event after we updated "checkout" key for event listeners to fetch
            window.dispatchEvent(new Event("checkoutUpdated"));
            window.dispatchEvent(new Event("searchBarUpdated"));
        } else if (GetCurrentUser().role === "Employee") {
            location.hash = "/EditFood";
        } else {
            location.hash = "/OwnerLanding";
        }
    }

    const listOfCustomers: userProps[] = ListOfCustomers();

    /**
     * Find the selected option (owner, employee, or some user) based on given name.
     * @param name - name of the user to find.
     * @returns the found user or a fallback role.
     */
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
                <label> Role </label>
                <Select
                    data-testid="role-select"
                    onChange={(e) => changeRole(findUserInList(e.target.value))}
                    name={userRole.name}
                    value={userRole.name}
                    id={userRole.name}
                    key={userRole.orderID}
                >
                    {ROLES.map((user: userProps) => (
                        <option
                            data-testid={user.name}
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
                            data-testid={customer.name + " " + customer.orderID}
                            style={{ color: "black" }}
                            value={customer.name}
                            key={customer.orderID}
                            id={customer.name}
                        >
                            {customer.name}
                        </option>
                    ))}
                </Select>
            </form>
        </div>
    );
}
