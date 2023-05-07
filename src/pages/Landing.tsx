import React from "react";
import { Heading, Text, Flex, Box, Grid, Spacer } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import restaurantLogo from "./restaurant-logo.png";
import CheckoutList from "../components/CheckoutList";
import background from "./background.jpg";
import { SelectRole } from "../components/SelectRole";

export default function Landing() {
    return (
        <>
            <div
                style={{
                    padding: 10,
                    backgroundImage: `url(${background})`,
                    backgroundSize: "130%",
                    backgroundPosition: "center"
                }}
            >
                <Flex
                    className="website-title"
                    as="header"
                    textAlign="center"
                    px={5}
                    py={2}
                    color="white"
                >
                    <Box>
                        <Heading as="h1" fontSize="70px" fontWeight="extrabold">
                            team 13
                        </Heading>
                        <Text fontSize="20px" fontWeight="bold">
                            good food, good mood.
                        </Text>
                    </Box>
                    <Box
                        position="absolute"
                        top="6%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                    >
                        <img
                            src={restaurantLogo}
                            alt="restaurant-logo"
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
                        color="white"
                        as="h2"
                        display="flex"
                        justifyContent="center"
                        fontSize="40px"
                    >
                        our menu
                    </Heading>
                    <Text
                        color="white"
                        display="flex"
                        justifyContent="center"
                        py={2}
                        fontSize="20px"
                    >
                        open 12-9 pm
                    </Text>
                </div>
                <Grid templateColumns={"repeat(2, 1fr)"} gap="5vw">
                    <Box flex="1" p="4" ml="5vw">
                        <SearchBar></SearchBar>
                    </Box>
                    <Grid overflow="hidden" flex="1" p="4" mt="35px">
                        <CheckoutList></CheckoutList>
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </>
    );
}
