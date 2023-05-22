import React from "react";
import { Heading, Box, Flex, Spacer, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import RemoveFood from "../components/RemoveFood";
import "../components/Styles.css";
import AddNewFood from "../components/AddNewFood";

export default function AddFood() {
    return (
        <div style={{ padding: 10 }} data-testid="add-food-page">
            <Flex wrap="wrap">
                <Heading className="heading">Add / Remove Food</Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Edit Food
                    </Button>
                    <Button
                        as={NavLink}
                        to="/UserStats"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        View Stats
                    </Button>
                </VStack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <Box w="100%" maxW="100vw">
                <br></br>
                <Flex
                    //templateColumns={"repeat(20, 1fr)"}
                    gap={4}
                    mb={5}
                    maxW="100vw"
                    overflowX="auto"
                >
                    <Box flex="1" p="4" maxW="540px">
                        <AddNewFood></AddNewFood>
                    </Box>

                    <Box flex="1" p="4">
                        <Heading
                            size="2xl"
                            w="full"
                            p={10}
                            alignItems="flex-start"
                        >
                            Menu
                        </Heading>
                        <RemoveFood></RemoveFood>
                    </Box>
                </Flex>
            </Box>
            <></>
            <br></br>
        </div>
    );
}
