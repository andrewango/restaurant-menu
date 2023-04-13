import React from "react";
import { Heading, Box } from "@chakra-ui/react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

export default function AboutUs() {
    return (
        <div style={{ padding: 10 }}>
            <div>
                <Heading
                    display="flex"
                    justifyContent="center"
                    py={5}
                    fontSize="50px"
                    fontWeight="bold"
                >
                    about us
                </Heading>
            </div>
            <div>
                <NavBar></NavBar>
            </div>
            <Accordion allowToggle textAlign="center">
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" fontWeight="bold">
                                who we are
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        We&apos;re a team of 5 university students studying
                        computer science. This website is our CISC275 project!
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" fontWeight="bold">
                                our mission
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        Providing you the best online food ordering experience.
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
