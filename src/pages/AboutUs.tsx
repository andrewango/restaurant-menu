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
import "./CustomerStyles.css";

export default function AboutUs() {
    return (
        <div style={{ padding: 10 }} data-testid="about-us-page">
            <div>
                <Heading className="aboutus">about us</Heading>
            </div>
            <div>
                <NavBar></NavBar>
            </div>
            <Accordion allowToggle textAlign="center">
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box as="span" flex="1" fontWeight="bold">
                                meet our team
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <b>Colby Frashure</b> | music is my sole personality
                        trait <br></br>
                        <br></br>
                        <b>Ella Wilkins</b> | slayyyyy cisc275 <br></br>
                        <br></br>
                        <b>Sehee Hwang</b> | Tiger, the perfect animal <br></br>
                        <br></br>
                        <b>Gavin Caulfield</b> | stream local orange <br></br>
                        <br></br>
                        <b>Andrew Ngo</b> | i like snow c:
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
