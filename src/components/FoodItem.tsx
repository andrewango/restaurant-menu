import React from "react";
import {
    Image,
    Text,
    Card,
    Heading,
    CardBody,
    Stack,
    CardFooter,
    Box
} from "@chakra-ui/react";
import RatingFeature from "./RatingFeature";
import { useDrag } from "react-dnd";

export default function FoodItem({
    name,
    image,
    desc,
    ingredients,
    price,
    rating
}: {
    name: string;
    image: string;
    desc: string;
    ingredients: string[];
    price: number;
    rating: number;
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
                <Text
                    fontFamily="DM Serif"
                    fontSize="2xl"
                    mt={2}
                    fontWeight="medium"
                >
                    {`$${price}`}
                </Text>
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
                    <div className="desc">
                        <Text fontWeight="semibold" py="2">
                            {desc}
                        </Text>
                    </div>
                    <div className="ingredients">
                        {"Ingredients: " + ingredients.join(", ")}
                    </div>
                </CardBody>

                <CardFooter>
                    <RatingFeature></RatingFeature>
                </CardFooter>
            </Stack>
        </Card>
    );
}
