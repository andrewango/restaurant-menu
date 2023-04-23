import React from "react";
import {
    VStack,
    Box,
    Image,
    Flex,
    Grid,
    useMediaQuery
} from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import { MenuList } from "../pages/AddFood";

export default function FoodListAddUI(): JSX.Element {
    const foodlist = MenuList().map((foodProps: foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients]
        };
    });

    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
    const [isLargerThan1000] = useMediaQuery("(min-height: 1000px)");

    // Maps each food in our list to a box with food details
    return (
        <VStack
            spacing="3px"
            mt={100}
            alignItems="flex-start"
            h={isLargerThan1000 ? window.innerHeight * 0.65 : "600px"}
            overflowY="scroll"
        >
            <Grid
                templateColumns={
                    isLargerThan2000 ? "repeat(3, 1fr)" : "repeat(2, 1fr)"
                }
                rowGap={3}
            >
                {foodlist.map((food: foodProps) => {
                    return (
                        <Flex
                            key={food.name}
                            align="center"
                            w="90%"
                            borderWidth={2}
                            borderColor="black"
                            borderRadius="md"
                            p={2}
                        >
                            <Image
                                src={food.image}
                                alt={food.name}
                                borderRadius="full"
                                boxSize="100px"
                                objectFit="cover"
                                mr={2}
                            />
                            <Box
                                key={food.name}
                                w={300}
                                textAlign="center"
                                p={1}
                                alignItems="flex-start"
                            >
                                <div className="foodtitle">{food.name}</div>
                            </Box>
                        </Flex>
                    );
                })}
            </Grid>
            <br></br>
            <br></br>
        </VStack>
    );
}
