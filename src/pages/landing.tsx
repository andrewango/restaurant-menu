import React from "react";
import { Heading, Container, Text } from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";
import RatingFeature from "../components/RatingFeature";
import NavBar from "../components/NavBar";
import ItemListUI from "../components/ItemListUI";
import { SearchBar } from "../components/SearchBar";

export default function Landing() {
    return (
        <>
            <div style={{ padding: 10 }}>
                <Container maxW={1000}>
                    <Text
                        my="30px"
                        mb="5px"
                        textAlign={"center"}
                        fontWeight="750"
                        fontSize="70px"
                    >
                        welcome to team 13
                    </Text>
                    <Text
                        mb={10}
                        textAlign={"center"}
                        fontWeight="450"
                        fontSize="20px"
                    >
                        enjoy the best food on the planet
                    </Text>
                </Container>
                <NavBar></NavBar>
                <Container mt={10} ml={400}>
                    <Heading fontSize="40px">our menu</Heading>
                </Container>
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
