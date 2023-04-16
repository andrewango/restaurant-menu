import React from "react";
import { Heading, Container, Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import restaurantLogo from "./restaurant-logo.png";
import CheckoutList from "../components/CheckoutList";

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
                    <SelectRole></SelectRole>
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
                    <SearchBar></SearchBar>
                </Container>
                <hr></hr>
                <Container>
                    <CheckoutList></CheckoutList>
                </Container>
                <br></br>
            </div>
        </>
    );
}
