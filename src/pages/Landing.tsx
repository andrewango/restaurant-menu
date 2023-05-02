import React from "react";
import { Heading, Text, Flex, Box, Grid } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import restaurantLogo from "./restaurant-logo.png";
import CheckoutList from "../components/CheckoutList";
import background from "./background.jpg";

export default function Landing() {
    return (
        <>
            <div
                style={{
                    padding: 10,
                    backgroundImage: `url(${background})`,
                    backgroundSize: "120%",
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
                <Flex>
                    <Box flex="1" p="4" ml="100px">
                        <SearchBar></SearchBar>
                    </Box>
                    <Grid flex="1" p="4" mt="35px" ml="100px">
                        <CheckoutList></CheckoutList>
                    </Grid>
                </Flex>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </>
    );
}
