import React from "react";
import { Heading, Flex, Box, Spacer, VStack, Grid } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import EditFoodList from "../components/EditFoodList";
import { EditFoodMenu } from "../components/EditFoodMenu";
import { GetCurrentUser, SelectRole } from "../components/SelectRole";

function EditFood() {
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
                    Edit Food
                </Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    {GetCurrentUser().role === "Employee" && (
                        <SelectRole></SelectRole>
                    )}
                    {GetCurrentUser().role === "Owner" && (
                        <>
                            <Button
                                as={NavLink}
                                to="/AddFood"
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
                    <Box
                        as="nav"
                        display="flex"
                        justifyContent="center"
                        position="sticky"
                        top={0}
                        zIndex={99999999}
                        py={7}
                        bg="red.400"
                        data-testid="bar"
                    ></Box>
                ) : (
                    <NavBar></NavBar>
                )}
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
                <Grid templateColumns={"repeat(2, 1fr)"} gap="5vw" h="65vh">
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
