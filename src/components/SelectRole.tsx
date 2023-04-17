import React, { useState } from "react";
import { Stack } from "@chakra-ui/react";
import styled from "styled-components";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

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
    const user = sessionStorage.getItem("user");
    const a = user !== null && user !== undefined ? user : "Owner";

    const [userRole, setUserRole] = useState<string>(a);

    const ROLES = ["Owner", "Employee", "User"];

    function changeRole(key: string) {
        sessionStorage.setItem("user", key);
        setUserRole(key);
        location.reload();
    }

    return (
        <div>
            <form>
                <label> Your Role </label>
                <Select
                    onChange={(e) => changeRole(e.target.value)}
                    name={userRole}
                    value={userRole}
                    id={userRole}
                    key={userRole}
                >
                    {ROLES.map((role: string) => (
                        <option value={role} key={role} id={role}>
                            {role}
                        </option>
                    ))}
                </Select>
                {(sessionStorage.getItem("user") === "Owner" ||
                    sessionStorage.getItem("user") === null) && (
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
                            variant="outline"
                        >
                            edit users
                        </Button>
                    </Stack>
                )}
                {sessionStorage.getItem("user") === "Employee" && (
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
