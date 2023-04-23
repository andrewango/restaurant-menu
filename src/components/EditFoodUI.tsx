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
    useMediaQuery,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Divider
} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import "./Scrollbar.css";

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
        image,
        desc,
        rating,
        type,
        ingredients,
        popular,
        spicy,
        price
    }: {
        name: string;
        image: string;
        desc: string;
        rating: number;
        type: string[];
        ingredients: string[];
        popular: boolean;
        spicy: boolean;
        price: number;
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
                <Accordion allowToggle textAlign="center" w="100%">
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="start"
                                    flex="1"
                                >
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
                                                textAlign="end"
                                            >
                                                {name}
                                            </Heading>
                                        </div>
                                    </CardBody>
                                </Stack>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            {desc}
                            <hr></hr>
                            <b>Type: </b> {type.join(", ")}
                            <br></br>
                            <b>Ingredients: </b> {ingredients.join(", ")}
                            <br></br>
                            <b>
                                {popular
                                    ? spicy
                                        ? "Popular, Spicy"
                                        : "Popular"
                                    : ""}
                                {!popular && spicy ? "Spicy" : ""}
                            </b>
                            <>{popular || spicy ? <>&emsp; | &emsp;</> : ""}</>
                            <b>Rating: </b> {rating} <>&emsp;|&emsp;</>
                            <b>Price: </b> {price} <>$</>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
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
                                desc={food.desc}
                                rating={food.rating}
                                type={food.type}
                                ingredients={food.ingredients}
                                popular={food.popular}
                                spicy={food.spicy}
                                price={food.price}
                            />
                        );
                    })}
                </Grid>
            </VStack>
        </Box>
    );
}
