import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { GetCurrentUser } from "./SelectRole";
import { userProps } from "../interfaces/User";
import "./Styles.css";

/**
 * Component representing the navigation bar feature.
 * @returns JSX element representing the navigation bar.
 */

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
        <Box as="nav" className="navbar" py={4} data-testid="bar">
            {currentUser.role === "Customer" && (
                <>
                    <Link to="/">
                        <Box className="navbtn" as="span" mr={4}>
                            menu
                        </Box>
                    </Link>
                    <Link to="/AboutUs">
                        <Box className="navbtn" as="span">
                            about us
                        </Box>
                    </Link>
                </>
            )}
            {currentUser.role === "Owner" && (
                <>
                    <Link to="/OwnerLanding">
                        <Box className="navbtn" as="span" mr={4}>
                            main
                        </Box>
                    </Link>
                    {location.hash === "#/EditUsers" && (
                        <Link to="/ManageFoods">
                            <Box className="navbtn" as="span">
                                manage food
                            </Box>
                        </Link>
                    )}
                    {(location.hash === "#/EditFood" ||
                        location.hash === "#/AddRemoveFood" ||
                        location.hash === "#/UserStats" ||
                        location.hash === "#/ManageFoods") && (
                        <Link to="/EditUsers">
                            <Box className="navbtn" as="span">
                                manage users
                            </Box>
                        </Link>
                    )}
                    {console.log("path: " + location.hash)}
                </>
            )}
        </Box>
    );
}
