import React from "react";
import {
    Text,
    Grid,
    Button,
    Center,
    Flex,
    Heading,
    Spacer,
    Box,
    useMediaQuery
} from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";
import "./OwnerStyles.css";
import "../components/Styles.css";

<link rel="preload" as="image" href="./background.jpg"></link>;
export default function OwnerLanding() {
    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
    return (
        <div style={{ padding: 10 }} data-testid="owner-landing-page">
            <Flex wrap="wrap" textAlign="center" px={5} py={2}>
                <Heading className="heading">
                    Ristorante Della Squadra 13
                </Heading>
                <Spacer></Spacer>
                <SelectRole></SelectRole>
            </Flex>
            <Box as="nav" className="navbar" py={7}></Box>
            <Center mt={10}>
                <Grid
                    templateColumns={
                        isLargerThan2000 ? "repeat(2, 1fr)" : "repeat(2, 1fr)"
                    }
                    columnGap="3vw"
                >
                    <Button
                        className="food"
                        // w="40vw"
                        // h="80vh"
                        onClick={() => (location.hash = "/ManageFoods")}
                    >
                        <Text className="text" w="20vw" font-weight="bold">
                            Manage Food
                        </Text>
                    </Button>
                    <Button
                        className="user"
                        onClick={() => (location.hash = "/EditUsers")}
                    >
                        <Text className="text" font-weight="bold">
                            Manage Users
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
