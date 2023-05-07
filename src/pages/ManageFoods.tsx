import React from "react";
import { Text, Grid, Button, Center, Flex, Heading } from "@chakra-ui/react";
import "./OwnerLanding.css";
import NavBar from "../components/NavBar";

export default function OwnerLanding() {
    return (
        <div style={{ padding: 10 }}>
            <Flex wrap="wrap" textAlign="center" px={5} py={2}>
                <Heading
                    display="flex"
                    justifyContent="center"
                    mt={8}
                    px={10}
                    fontSize="50px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    Manage Food
                </Heading>
            </Flex>
            <NavBar></NavBar>
            <Center mt={10}>
                <Grid templateColumns={"repeat(3, 1fr)"} columnGap="3vw">
                    <Button
                        className="add"
                        w="25vw"
                        h="80vh"
                        onClick={() => (location.hash = "/AddFood")}
                    >
                        <Text
                            className="text"
                            w={window.innerWidth * 0.2}
                            font-weight="bold"
                        >
                            Add / Remove
                        </Text>
                    </Button>
                    <Button
                        className="edit"
                        w="25vw"
                        h="80vh"
                        onClick={() => (location.hash = "/EditFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Edit
                        </Text>
                    </Button>
                    <Button
                        className="stats"
                        w="25vw"
                        h="80vh"
                        onClick={() => (location.hash = "/UserStats")}
                    >
                        <Text className="text" font-weight="bold">
                            Stats
                        </Text>
                    </Button>
                </Grid>
            </Center>
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}
