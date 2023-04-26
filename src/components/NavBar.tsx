import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GetCurrentUser } from "./SelectRole";
import { userProps } from "../interfaces/User";

export default function NavBar() {
    const [currentUser, setCurrentUser] = useState<userProps>(GetCurrentUser());

    useEffect(() => {
        const handleStorage = () => {
            //console.log("handleStorage called");
            setCurrentUser(GetCurrentUser());
        };
        // Event listeners to run handleStorage() if "checkout" key is updated
        window.addEventListener("checkoutUpdated", handleStorage);
        return () =>
            window.removeEventListener("checkoutUpdated", handleStorage);
    }, []);

    return (
        // Create red bar that spans the whole page horizontally and has our two navigation links for "menu" and "about us"
        <Box
            as="nav"
            display="flex"
            justifyContent="center"
            position="sticky"
            top={0}
            zIndex={99999999}
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
            {(currentUser.role === "Owner" || currentUser === null) && (
                <>
                    <Link to="/EditFood">
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
                            edit food
                        </Box>
                    </Link>
                    <Link to="/EditUsers">
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
                            edit users
                        </Box>
                    </Link>
                </>
            )}
            {currentUser.role === "Employee" && (
                <Link to="/EditFood">
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
                        edit food
                    </Box>
                </Link>
            )}
        </Box>
    );
}
