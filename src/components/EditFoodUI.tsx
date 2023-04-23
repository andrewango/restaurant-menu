import React from "react";
import {
    Image,
    Card,
    Heading,
    CardBody,
    Stack,
    Box,
    VStack,
    Grid,
    useMediaQuery
} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { foodProps } from "../interfaces/Food";

export default function EditFoodUI({
    foodData
}: {
    foodData: foodProps[];
}): JSX.Element {
    const foodlist = foodData.map((foodProps) => {
        return {
            ...foodProps,
            type: [...foodProps.type],
            ingredients: [...foodProps.ingredients],
            price: foodProps.price
        };
    });
    function FoodItem({
        name,
        image
    }: {
        name: string;
        image: string;
    }): JSX.Element {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "foodItem",
            item: { name: name },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));

        return (
            <Card
                ref={drag}
                key={name}
                size="sm"
                w="550px"
                direction={{ base: "column", sm: "row" }}
                overflow="hidden"
                variant="elevated"
                border={isDragging ? "3px solid tomato" : "0px"}
            >
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Image
                        src={image}
                        alt={name}
                        objectFit="cover"
                        maxW={{ base: "100%", sm: "200px" }}
                        borderRadius="full"
                        boxSize="100px"
                        mx={5}
                        my={5}
                    />
                </Box>
                <Stack>
                    <CardBody>
                        <div className="foodTitle">
                            <Heading
                                fontFamily="Ananda Black"
                                display="inline-block"
                                marginRight="6"
                            >
                                {name}
                            </Heading>
                        </div>
                    </CardBody>
                </Stack>
            </Card>
        );
    }
    const [isLargerThan2000] = useMediaQuery("(min-width: 2000px)");
    return (
        <Box h="750px" overflowY="scroll" mt={100}>
            <VStack spacing="3px">
                <Grid
                    templateColumns={
                        isLargerThan2000 ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
                    }
                    rowGap={3}
                >
                    {foodlist.map((food) => {
                        return (
                            <FoodItem
                                key={food.name}
                                name={food.name}
                                image={food.image}
                            />
                        );
                    })}
                </Grid>
            </VStack>
        </Box>
    );
}
