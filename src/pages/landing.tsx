import React from "react";
import {
    Heading,
    Container,
    Text,
    Stack,
    Flex,
    Box,
    Spacer
} from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";
import NavBar from "../components/NavBar";
import ItemListUI from "../components/ItemListUI";
import { SearchBar } from "../components/SearchBar";
import { Button } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import restaurantLogo from "./restaurant-logo.png";

export default function Landing() {
    return (
        <>
            <div style={{ padding: 10 }}>
                <Flex
                    as="header"
                    textAlign="center"
                    px={5}
                    py={2}
                    color="black"
                >
                    <Box>
                        <Heading as="h1" fontSize="70px" fontWeight="extrabold">
                            team 13
                        </Heading>
                        <Text fontSize="20px" fontWeight="bold">
                            good food, good mood.
                        </Text>
                    </Box>
                    <Box position="absolute" ml="43%">
                        <img
                            src={restaurantLogo}
                            alt="restaurant logo"
                            width="150px"
                            height="150px"
                        />
                    </Box>
                    <Spacer></Spacer>
                    <Stack
                        px={10}
                        py={3}
                        spacing={6}
                        direction="column"
                        textAlign="center"
                    >
                        <Button
                            as={NavLink}
                            to="/edit"
                            colorScheme="red"
                            size="md"
                            variant="solid"
                        >
                            edit foods
                        </Button>
                        <Button
                            as={NavLink}
                            to="/users"
                            colorScheme="red"
                            size="md"
                            variant="outline"
                        >
                            edit users
                        </Button>
                    </Stack>
                </Flex>
                <NavBar></NavBar>
                <div>
                    <Heading
                        as="h2"
                        display="flex"
                        justifyContent="center"
                        py={5}
                        fontSize="40px"
                    >
                        our menu
                    </Heading>
                </div>
                <Container ml={500}>
                    <ItemListUI></ItemListUI>
                </Container>
                <br></br>
                <Container>
                    <SelectRole></SelectRole>
                    <SearchBar></SearchBar>
                </Container>
            </div>
        </>
    );
}
