import React, { useEffect, useState } from "react";
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
import { GrStar } from "react-icons/gr";
import { useDrag } from "react-dnd";
import { GetCurrentUser } from "./SelectRole";
import { userProps } from "../interfaces/User";
import "./EditFoodStyles.css";

function countOrders(list: userProps[], foodName: string): number {
    return list.reduce((count, user) => {
        return (
            count + user.order.filter((food) => food.name === foodName).length
        );
    }, 0);
}

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
    const [currentUser, setCurrentUser] = useState<userProps>(GetCurrentUser());
    const customers: string | null = sessionStorage.getItem("customers");
    const storageCustomers: userProps[] = customers
        ? JSON.parse(customers)
        : [];
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
        <Card
            data-testid={name}
            ref={drag}
            key={name}
            className="dragcard"
            size="sm"
            direction={{ base: "column", sm: "row" }}
            variant="elevated"
            border={isDragging ? "3px solid tomato" : "0px"}
        >
            <Box display="flex" flexDirection="column" alignItems="center">
                <Image
                    src={image}
                    alt={name}
                    className="drag-image"
                    maxW={{ base: "100%", sm: "200px" }}
                    boxSize="100px"
                />
                <Text className="desc price" fontFamily="DM Serif">
                    {`$${price}`}
                </Text>
                {currentUser.role === "Owner" && (
                    <Text className="desc" mt={2}>
                        {`In ${countOrders(
                            storageCustomers,
                            name
                        )} user lists.`}
                    </Text>
                )}
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
                    {[1, 2, 3, 4, 5].map((star, i) => {
                        i = i + 1;
                        return (
                            <div key={i}>
                                <Box className="base-box">
                                    <GrStar
                                        data-testid="star-icon"
                                        key={i}
                                        className="star"
                                        size={20}
                                        color={"#D4D4D4"}
                                    />
                                </Box>
                                <label>
                                    <Box
                                        style={
                                            i - rating < 1 && i - rating > 0
                                                ? { width: "50%" }
                                                : { width: "100%" }
                                        }
                                        className="star-box"
                                    >
                                        <GrStar
                                            data-testid="star-icon"
                                            key={i}
                                            className="star"
                                            size={20}
                                            color={
                                                i <= rating ||
                                                (i - rating < 1 &&
                                                    i - rating > 0)
                                                    ? "#FFDD00"
                                                    : "transparent"
                                            }
                                        />
                                    </Box>
                                </label>
                            </div>
                        );
                    })}
                </CardFooter>
            </Stack>
        </Card>
    );
}
