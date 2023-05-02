import React from "react";
import {
    Text,
    Grid,
    Button,
    Center,
    Flex,
    Heading,
    Box
} from "@chakra-ui/react";
import "./OwnerLanding.css";

export default function OwnerLanding() {
    return (
        <div>
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
            <Box
                as="nav"
                display="flex"
                justifyContent="center"
                position="sticky"
                top={0}
                zIndex={99999999}
                py={7}
                bg="red.400"
                data-testid="bar"
            ></Box>
            <Center mt={window.innerHeight * 0.03}>
                <Grid
                    templateColumns={"repeat(3, 1fr)"}
                    columnGap={window.innerWidth * 0.02}
                >
                    <Button
                        className="food"
                        //backgroundImage={background}
                        w={window.innerWidth * 0.3}
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
                        className="user"
                        w={window.innerWidth * 0.3}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/EditFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Edit
                        </Text>
                    </Button>
                    <Button
                        className="user"
                        w={window.innerWidth * 0.3}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/RemoveFood")}
                    >
                        <Text className="text" font-weight="bold">
                            Remove
                        </Text>
                    </Button>
                </Grid>
            </Center>
        </div>
    );
}
