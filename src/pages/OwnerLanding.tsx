import React from "react";
import {
    Text,
    Grid,
    Button,
    Center,
    Flex,
    Heading,
    Spacer,
    Box
} from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";
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
                    Ristorante Della Squadra 13
                </Heading>
                <Spacer></Spacer>
                <SelectRole></SelectRole>
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
                    templateColumns={"repeat(2, 1fr)"}
                    columnGap={window.innerWidth * 0.05}
                >
                    <Button
                        className="food"
                        //backgroundImage={background}
                        w={window.innerWidth * 0.4}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/ManageFoods")}
                    >
                        <Text
                            className="text"
                            w={window.innerWidth * 0.2}
                            font-weight="bold"
                        >
                            Manage Food
                        </Text>
                    </Button>
                    <Button
                        className="user"
                        w={window.innerWidth * 0.4}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/EditUsers")}
                    >
                        <Text className="text" font-weight="bold">
                            Manage User
                        </Text>
                    </Button>
                </Grid>
            </Center>
        </div>
    );
}
