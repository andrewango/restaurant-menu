import React from "react";
import { Heading, Stack, Spacer, Flex, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import { SelectRole } from "../components/SelectRole";

function EditFood() {
    sessionStorage.getItem("user") === "User" ? (
        <a href="/">Home</a>
    ) : (
        <a href="/EditFood">Edit Food</a>
    );
    return (
        <>
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
                    edit foods
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
                    <SelectRole></SelectRole>
                </Stack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <div style={{ textAlign: "center" }}>
                <div className="container">
                    <br></br>
                    {/* <br></br>
                    <h1>Edit Foods</h1>
                    <br></br>
                    <p>Your Role : {window.sessionStorage.getItem("user")}</p> */}
                    <br></br>
                    {(sessionStorage.getItem("user") === "Owner" ||
                        sessionStorage.getItem("user") === null) && (
                        <>
                            <Button
                                as={NavLink}
                                to="/AddFood"
                                colorScheme="red"
                                size="md"
                                variant="outline"
                            >
                                Add New Food
                            </Button>
                            <br></br>
                            <br></br>
                            <Button
                                as={NavLink}
                                to="/RemoveFood"
                                colorScheme="red"
                                size="md"
                                variant="outline"
                            >
                                Remove Food
                            </Button>
                            <br></br>
                            <br></br>
                            <hr></hr>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default EditFood;
