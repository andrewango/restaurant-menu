import React from "react";
import AddDeleteUsers from "../components/AddDeleteUsers";
import { Flex, Heading } from "@chakra-ui/layout";
import NavBar from "../components/NavBar";
import "../components/Styles.css";

export default function EditUsers() {
    return (
        <div style={{ padding: 10 }}>
            <Flex wrap="wrap">
                <Heading className="heading">Manage Users</Heading>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <AddDeleteUsers></AddDeleteUsers>
        </div>
    );
}
