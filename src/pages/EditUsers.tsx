import React from "react";
import AddDeleteUsers from "../components/AddDeleteUsers";
import { Flex, Heading } from "@chakra-ui/layout";
import NavBar from "../components/NavBar";

export default function EditUsers() {
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
                    Manage Users
                </Heading>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <AddDeleteUsers></AddDeleteUsers>
        </div>
    );
}
