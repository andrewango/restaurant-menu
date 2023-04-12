import React from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import { Link as Router } from "react-router-dom";
import { Link } from "@chakra-ui/react";
export default function NavBar() {
    return (
        <Box bg="red.500" py={1}>
            <Flex maxW="800px" mx="auto" justify="space-around">
                <Link as={Router} to="/" color="white">
                    menu
                </Link>
                <Box>
                    <Link as={Router} to="/aboutus" color="white">
                        about us
                    </Link>
                </Box>
            </Flex>
        </Box>
    );
}
