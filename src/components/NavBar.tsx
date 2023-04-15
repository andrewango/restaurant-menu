import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        // Create red bar that spans the whole page horizontally and has our two navigation links for "menu" and "about us"
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
            <Link to="/AboutUs">
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
