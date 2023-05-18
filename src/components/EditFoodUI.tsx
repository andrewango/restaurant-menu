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
    AccordionPanel
} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { foodProps } from "../interfaces/Food";
import "./Scrollbar.css";
import "./EditFoodStyles.css";

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
        quantity: number;
        id: number;
    }): JSX.Element {
        // DRAG STATE FOR DRAGGING FOOD IN MENU LIST TO THE EDIT BOX TO CREATE A NEW FOOD TAB
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "foodItem",
            item: { name: name },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging()
            })
        }));

        // RENDER A FOOD ITEM IN THE MENU AS A CARD WITH A TOGGLE TO DISPLAY FOOD INFO
        return (
            <Card
                ref={drag}
                key={name}
                className="dragcard"
                direction={{ base: "column", sm: "row" }}
                variant="elevated"
                border={isDragging ? "3px solid tomato" : "0px"}
                data-testid="card"
            >
                <Accordion
                    data-testid={name}
                    allowToggle
                    textAlign="center"
                    w="100%"
                >
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box className="drag-box">
                                    <Image
                                        src={image}
                                        alt={name}
                                        boxSize="100px"
                                        maxW={{ base: "100%", sm: "200px" }}
                                        className="drag-image"
                                    />
                                </Box>
                                <Stack>
                                    <CardBody>
                                        <div className="foodTitle">
                                            <Heading
                                                className="accordion-name"
                                                fontFamily="Ananda Black"
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
                            <b>Price: </b> <>$</>
                            {price}
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Card>
        );
    }
    const [isLargerThan2000] = useMediaQuery("(min-width: 2300px)");

    // RENDER ALL OF OUR FOODS IN THE MENU IN A VERTICAL STACK
    return (
        <Box h="65vh" overflowY="scroll" mt={70} className="section">
            <VStack spacing="3px">
                <Grid
                    data-testid="edit-menu"
                    templateColumns={
                        isLargerThan2000 ? "repeat(2, 1fr)" : "repeat(1, 1fr)"
                    }
                    rowGap={3}
                    columnGap={3}
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
                                quantity={food.quantity}
                                id={food.id}
                            />
                        );
                    })}
                </Grid>
            </VStack>
        </Box>
    );
}
