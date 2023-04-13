import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <Box
            as="nav"
            display="flex"
            justifyContent="center"
            py={4}
            bg="red.400"
        >
            <Link to="/">
                <Box
                    as="span"
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                    px={4}
                    py={2}
                    transition="background-color 0.3s ease"
                    _hover={{ bgColor: "red.600", color: "white" }}
                    borderRadius="md"
                    mr={4}
                >
                    menu
                </Box>
            </Link>
            <Link to="/aboutus">
                <Box
                    as="span"
                    fontSize="lg"
                    fontWeight="bold"
                    color="white"
                    px={4}
                    py={2}
                    transition="background-color 0.3s ease"
                    _hover={{ bgColor: "red.600", color: "white" }}
                    borderRadius="md"
                >
                    about us
                </Box>
            </Link>
        </Box>
    );
}
