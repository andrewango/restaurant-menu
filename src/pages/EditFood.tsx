import React from "react";
import { Heading, Flex, Divider, Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import EditFoodList from "../components/EditFoodList";
import { EditFoodMenu } from "../components/EditFoodMenu";
import { GetCurrentUser } from "../components/SelectRole";

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
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <div style={{ textAlign: "center" }}>
                <div className="container">
                    <br></br>
                    <br></br>
                    <form>
                        {(GetCurrentUser().role === "Owner" ||
                            GetCurrentUser().role === null) && (
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
                            </div>
                        )}
                    </form>
                </div>
                <Divider></Divider>
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
