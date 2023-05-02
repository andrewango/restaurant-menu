import {
    Image,
    Text,
    Card,
    Heading,
    CardBody,
    Stack,
    Box
} from "@chakra-ui/react";
import { useDrag } from "react-dnd";
import { userProps } from "../interfaces/User";

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
    price
}: {
    name: string;
    image: string;
    desc: string;
    ingredients: string[];
    price: number;
}): JSX.Element {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "foodItem",
        item: { name: name },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    const customers: string | null = sessionStorage.getItem("customers");
    const storageCustomers: userProps[] = customers
        ? JSON.parse(customers)
        : [];
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
                    className="desc"
                    fontFamily="DM Serif"
                    fontSize="2xl"
                    mt={2}
                    fontWeight="medium"
                >
                    {`$${price}`}
                </Text>
                <Text className="desc" mt={2}>
                    {`In ${countOrders(storageCustomers, name)} user lists.`}
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
            </Stack>
        </Card>
    );
}
