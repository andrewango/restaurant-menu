import React from "react";
import {
    Heading,
    Grid,
    GridItem,
    Box,
    Flex,
    Spacer,
    VStack
} from "@chakra-ui/react";
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
                <Grid
                    templateColumns="repeat(20, minmax(0,1fr))"
                    gap={4}
                    mb={5}
                >
                    <GridItem colStart={1} colEnd={7}>
                        <AddNewFood></AddNewFood>
                    </GridItem>

                    <GridItem colStart={7} colEnd={20} h="10">
                        <Heading
                            size="2xl"
                            w="full"
                            h="full"
                            p={10}
                            alignItems="flex-start"
                        >
                            Menu
                        </Heading>
                        <RemoveFood></RemoveFood>
                    </GridItem>
                </Grid>
            </Box>
            <></>
            <br></br>
        </div>
    );
}
