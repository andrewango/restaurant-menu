import React from "react";
import { Heading, Text, Flex, Box, Grid, Spacer } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import restaurantLogo from "../assets/restaurant-logo.png";
import CheckoutList from "../components/CheckoutList";
import { SelectRole } from "../components/SelectRole";
import { DeliveryDropDown } from "../components/DeliveryDropDown";
import "./CustomerStyles.css";

export default function Landing() {
    return (
        <>
            <div className="background" data-testid="landing-page">
                <Flex className="website-title title" as="header">
                    <Box>
                        <Heading as="h1" fontSize="70px" fontWeight="extrabold">
                            team 13
                        </Heading>
                        <Text fontSize="20px" fontWeight="bold">
                            good food, good mood.
                        </Text>
                    </Box>
                    <Box className="title-box">
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
                    <Heading as="h2" className="body-heading">
                        our menu
                    </Heading>
                    <Text className="body-text">open 12-9 pm</Text>
                </div>
                <Grid templateColumns={"repeat(2, 1fr)"} gap="5vw">
                    <Box flex="1" p="4" ml="5vw">
                        <SearchBar></SearchBar>
                    </Box>
                    <Grid flex="1" p="4" mt="35px">
                        <CheckoutList></CheckoutList>
                        <DeliveryDropDown></DeliveryDropDown>
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </>
    );
}
