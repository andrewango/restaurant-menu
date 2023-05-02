import React from "react";
import { Heading, Flex, Box, Spacer, VStack } from "@chakra-ui/react";
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
                    edit foods
                </Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    {GetCurrentUser().role === "Employee" && (
                        <SelectRole></SelectRole>
                    )}
                    <Button
                        as={NavLink}
                        to="/AddFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Add Food
                    </Button>
                    <Button
                        as={NavLink}
                        to="/RemoveFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Remove Food
                    </Button>
                </VStack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <br></br>
            <div style={{ textAlign: "center" }}>
                <Flex>
                    <Box flex="1" p="4" ml="100px">
                        <EditFoodMenu></EditFoodMenu>
                    </Box>
                    <Box flex="1" p="4" mt="35px" ml="100px">
                        <EditFoodList></EditFoodList>
                    </Box>
                </Flex>
            </div>
        </div>
    );
}

export default EditFood;
