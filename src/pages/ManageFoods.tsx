import React from "react";
import {
    Text,
    Grid,
    Button,
    Center,
    Flex,
    Heading,
    useMediaQuery
} from "@chakra-ui/react";
import "./OwnerLanding.css";
import NavBar from "../components/NavBar";

export default function OwnerLanding() {
    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
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
                    Manage Foods
                </Heading>
            </Flex>
            <NavBar></NavBar>
            <Center mt={10}>
                <Grid
                    templateColumns={
                        isLargerThan2000 ? "repeat(3, 1fr)" : "repeat(3, 1fr)"
                    }
                    columnGap={window.innerWidth * 0.03}
                >
                    <Button
                        className="add"
                        //backgroundImage={background}
                        w={window.innerWidth * 0.25}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/AddFood")}
                    >
                        <Text
                            className="text"
                            w={window.innerWidth * 0.2}
                            font-weight="bold"
                        >
                            Add
                        </Text>
                    </Button>
                    <Button
                        className="edit"
                        w={window.innerWidth * 0.25}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/EditFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Edit
                        </Text>
                    </Button>
                    <Button
                        className="remove"
                        w={window.innerWidth * 0.25}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/RemoveFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Remove
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
