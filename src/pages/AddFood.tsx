import React, { useState } from "react";
import ItemListUI from "../components/ItemListUI";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Stack,
    Spacer,
    Flex,
    Checkbox
} from "@chakra-ui/react";
import { FormLabel, FormControl, Input, Button } from "@chakra-ui/react";
import foodList from "../data/foods.json";
import { foodProps } from "../interfaces/Food";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";

export default function AddFood() {
    const foods: foodProps[] = foodList.FOODS;
    const [foodlist, setFoodlist] = useState<foodProps[]>(foods);
    const [food, setFood] = useState<foodProps>();
    const [popular, setPopular] = useState<boolean>(false);
    const [spicy, setSpicy] = useState<boolean>(false);
    const [form, setForm] = useState<foodProps>({
        name: "",
        image: "",
        desc: "",
        rating: 0,
        type: [],
        ingredients: [],
        popular: popular,
        spicy: spicy
    });
    type FoodFormProps = {
        onSubmit: (form: foodProps) => void;
    };

    const { name, image, desc, rating, type, ingredients } = form;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const changeBoolean = () => {
        setForm({
            ...form,
            spicy: spicy,
            popular: popular
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(form);
        setForm({
            name: "",
            image: "",
            desc: "",
            rating: 0,
            type: [],
            ingredients: [],
            popular: false,
            spicy: false
        });
    };

    const onSubmit = (form: {
        name: string;
        image: string;
        desc: string;
        rating: number;
        type: string[];
        ingredients: string[];
        popular: boolean;
        spicy: boolean;
    }) => {
        setFood(form);
        if (foodlist) {
            const copy: foodProps[] = foodlist.map(
                (food: foodProps): foodProps => ({
                    ...food,
                    type: [...food.type],
                    ingredients: [...food.ingredients]
                })
            );
            //const newFoodList: foodProps[] = [...copy, food];
            setFoodlist(copy);
        }
    };

    return (
        <div style={{ padding: 10 }}>
            <Flex wrap="wrap">
                <Heading
                    display="flex"
                    justifyContent="center"
                    mt={8}
                    px={10}
                    fontSize="50px"
                    fontWeight="bold"
                    textAlign="center"
                >
                    edit users
                </Heading>
                <Spacer></Spacer>
                <Stack
                    px={10}
                    py={3}
                    mb={5}
                    spacing={6}
                    direction="column"
                    textAlign="center"
                >
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="solid"
                    >
                        edit foods
                    </Button>
                    <Button
                        as={NavLink}
                        to="/EditUsers"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        edit users
                    </Button>
                </Stack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired id="name" width="500px" px={20} mt={10}>
                    <FormLabel>New Food:</FormLabel>
                    <Input name="name" value={name} onChange={onChange} />
                    <Input
                        name="image"
                        value={image}
                        onChange={onChange}
                        mt={3}
                    />
                    <Input
                        name="desc"
                        value={desc}
                        onChange={onChange}
                        mt={3}
                    />
                    <Input
                        name="rating"
                        value={rating}
                        onChange={onChange}
                        mt={3}
                    />
                    <Input
                        name="type"
                        value={type}
                        onChange={onChange}
                        mt={3}
                    />
                    <Input
                        name="ingredients"
                        value={ingredients}
                        onChange={onChange}
                        mt={3}
                    />
                    <Checkbox
                        type="checkbox"
                        name="popular"
                        onChange={(e) => setSpicy(e.target.checked)}
                        mt={3}
                    />
                    <Checkbox
                        type="checkbox"
                        name="spicy"
                        onChange={(e) => setSpicy(e.target.checked)}
                        mt={3}
                    />
                    <Button type="submit">Add New Food</Button>
                </FormControl>
            </form>
            <br></br>
            {/* <Box
                as="button"
                type="submit"
                onClick={onSubmit}
                id="add-customer"
                height="40px"
                lineHeight="2.1"
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                border="1px"
                ml={20}
                px={10}
                borderRadius="5px"
                fontSize="16px"
                fontWeight="semibold"
                bg="red.500"
                borderColor="red.600"
                color="white"
                _hover={{ bg: "red.600", color: "white" }}
                _active={{
                    bg: "red.300",
                    transform: "scale(0.95)",
                    borderColor: "orange"
                }}
                _focus={{
                    boxShadow:
                        "0 0 2px 2px rgba(255, 30, 0, .50), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
            >
                Add Customer
            </Box> */}
            <hr></hr>
            <div>
                {/* <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>image</Th>
                                <Th>desc</Th>
                                <Th>rating</Th>
                                <Th>type</Th>
                                <Th>ingredients</Th>
                                <Th>popular</Th>
                                <Th>spicy</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {foodlist.map((food: foodProps) => (
                                <Tr key={food.name}>
                                    <Td fontWeight="semibold">{food.name}</Td>
                                    <Td>{food.image}</Td>
                                    <Td>{food.desc}</Td>
                                    <Td>{food.rating}</Td>
                                    <Td>
                                        {food.type.map(
                                            (type: string) => type + ", "
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer> */}
                <div>
                    <ItemListUI foodData={foodlist}></ItemListUI>
                </div>
            </div>
        </div>
    );
}
