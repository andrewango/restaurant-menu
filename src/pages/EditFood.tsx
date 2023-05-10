import React from "react";
import { Heading, Flex, Box, Spacer, VStack, Grid } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import EditFoodList from "../components/EditFoodList";
import { EditFoodMenu } from "../components/EditFoodMenu";
import { GetCurrentUser, SelectRole } from "../components/SelectRole";
import "../components/Styles.css";

function EditFood() {
    return (
        <div style={{ padding: 10 }} data-testid="owner-landing-page">
            <Flex wrap="wrap">
                <Heading className="heading">Edit Food</Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    {GetCurrentUser().role === "Employee" && (
                        <SelectRole></SelectRole>
                    )}
                    {GetCurrentUser().role === "Owner" && (
                        <>
                            <Button
                                as={NavLink}
                                to="/AddRemoveFood"
                                colorScheme="red"
                                size="md"
                                variant="outline"
                            >
                                Add / Remove
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
                        </>
                    )}
                </VStack>
            </Flex>
            <div>
                {GetCurrentUser().role === "Employee" ? (
                    <Box as="nav" className="navbar" py={7}></Box>
                ) : (
                    <NavBar></NavBar>
                )}
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
                <Grid templateColumns={"repeat(2, 1fr)"} gap="5vw">
                    <Box flex="1" p="4" ml="5vw">
                        <EditFoodMenu></EditFoodMenu>
                    </Box>
                    <Box flex="1" p="4" mt="35px">
                        <EditFoodList></EditFoodList>
                    </Box>
                </Grid>
            </div>
        </div>
    );
}

export default EditFood;
