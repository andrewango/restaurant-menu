import React from "react";
import { Text, Grid, Button, Center, Flex, Heading } from "@chakra-ui/react";
import "./OwnerStyles.css";
import NavBar from "../components/NavBar";
import "../components/Styles.css";

export default function OwnerLanding() {
    return (
        <div style={{ padding: 10 }} data-testid="manage-foods-page">
            <Flex wrap="wrap" textAlign="center" px={5} py={2}>
                <Heading className="heading">Manage Food</Heading>
            </Flex>
            <NavBar></NavBar>
            <Center mt={10}>
                <Grid templateColumns={"repeat(3, 1fr)"} columnGap="3vw">
                    <Button
                        className="add"
                        onClick={() => (location.hash = "/AddFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Add / Remove
                        </Text>
                    </Button>
                    <Button
                        className="edit"
                        onClick={() => (location.hash = "/EditFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Edit
                        </Text>
                    </Button>
                    <Button
                        className="stats"
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
