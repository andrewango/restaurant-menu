import React from "react";
import { Heading, Stack, Spacer, Flex, Divider, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import EditFoodList from "../components/EditFoodList";
import { EditFoodMenu } from "../components/EditFoodMenu";

function EditFood() {
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
                {sessionStorage.getItem("user") === "Owner" && (
                    <div>
                        <Stack
                            px={10}
                            py={5}
                            mb={5}
                            spacing={6}
                            textAlign="center"
                        >
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
                    </div>
                )}
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <div style={{ textAlign: "center" }}>
                <div className="container">
                    <br></br>
                    <br></br>
                    <form>
                        {sessionStorage.getItem("user") === "Owner" && (
                            <div>
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
                                <Divider w="full"></Divider>
                            </div>
                        )}
                    </form>
                </div>
                <Flex>
                    <Box flex="1" p="4" ml="100px">
                        <EditFoodMenu></EditFoodMenu>
                    </Box>
                    <Box flex="1" p="4" mt="35px" ml="100px">
                        <EditFoodList></EditFoodList>
                    </Box>
                </Flex>
            </div>
        </>
    );
}

export default EditFood;
