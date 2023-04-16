import React, { useState } from "react";
import {
    Image,
    Text,
    Card,
    Heading,
    CardBody,
    Stack,
    CardFooter
} from "@chakra-ui/react";
import RatingFeature from "./RatingFeature";
import { useDrag } from "react-dnd";

export default function FoodItem({
    name,
    image,
    desc,
    ingredients
}: {
    name: string;
    image: string;
    desc: string;
    ingredients: string[];
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
            w="550px"
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="elevated"
            border={isDragging ? "3px solid pink" : "0px"}
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
            <Stack>
                <CardBody>
                    <div className="foodTitle">
                        <Heading fontFamily="Ananda Black">{name}</Heading>
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
