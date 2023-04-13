import React from "react";
import { Flex, Center } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
    return (
        <Flex
            color="white"
            bg="red.500"
            justifyContent="space-around"
            wrap="wrap"
            w="60%"
            mx="auto"
        >
            <Center w={200} h={10}>
                <NavLink to="/" style={{ color: "white", fontWeight: "bold" }}>
                    menu
                </NavLink>
            </Center>
            <Center w={200} h={10}>
                <NavLink
                    to="/aboutus"
                    style={{ color: "white", fontWeight: "bold" }}
                >
                    about us
                </NavLink>
            </Center>
        </Flex>
    );
}
