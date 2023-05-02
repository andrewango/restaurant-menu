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
import "./OwnerLanding.css";
// import background from "./background.jpg";
// import manageUsers from "./manageUsers.jpg";

<link rel="preload" as="image" href="./background.jpg"></link>;
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
            <Center mt={10}>
                <Grid
                    templateColumns={
                        isLargerThan2000 ? "repeat(3, 1fr)" : "repeat(3, 1fr)"
                    }
                    columnGap={window.innerWidth * 0.03}
                >
                    <Button
                        className="food"
                        //backgroundImage={background}
                        w={window.innerWidth * 0.25}
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
                        //backgroundImage={manageUsers}
                        w={window.innerWidth * 0.25}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/EditUsers")}
                    >
                        <Text className="text" font-weight="bold">
                            Manage User
                        </Text>
                    </Button>
                    <Button
                        className="stats"
                        //backgroundImage={manageUsers}
                        w={window.innerWidth * 0.25}
                        h={window.innerHeight * 0.8}
                        onClick={() => (location.hash = "/UserStats")}
                    >
                        <Text className="text" font-weight="bold">
                            View Stats
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
