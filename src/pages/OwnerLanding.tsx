import React from "react";
import { Divider, Text, Grid, Button, Center } from "@chakra-ui/react";
import { SelectRole } from "../components/SelectRole";

export default function OwnerLanding() {
    return (
        <div>
            <SelectRole></SelectRole>
            <Divider></Divider>
            <Center>
                <Grid templateColumns={"repeat(2, 1fr)"} columnGap={20}>
                    <Button
                        w={window.innerWidth * 0.4}
                        h={window.innerHeight * 0.8}
                    >
                        <Text>Manage Food</Text>
                    </Button>
                    <Button
                        w={window.innerWidth * 0.4}
                        h={window.innerHeight * 0.8}
                    >
                        <Text>Manage User</Text>
                    </Button>
                </Grid>
            </Center>
        </div>
    );
}
