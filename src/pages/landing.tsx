import React from "react";
import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";
import RatingFeature from "../components/RatingFeature";
import NavBar from "../components/NavBar";

export default function Landing() {
    return (
        <>
            <div style={{ padding: 10 }}>
                <Container>
                    <Text
                        my="30px"
                        mb="0px"
                        textAlign={"center"}
                        fontWeight="750"
                        fontSize="50px"
                    >
                        welcome to team 13
                    </Text>
                    <Text
                        mb={10}
                        textAlign={"center"}
                        fontWeight="450"
                        fontSize="17px"
                    >
                        enjoy the best food on the planet
                    </Text>
                </Container>
                <Container>
                    <NavBar></NavBar>
                </Container>
            </div>
        </>
    );
}
