import React from "react";
import {
    Heading,
    Grid,
    GridItem,
    Box,
    Flex,
    Spacer,
    VStack
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { NavLink } from "react-router-dom";
import RemoveFood from "../components/RemoveFood";
import "../components/Styles.css";
import AddNewFood from "../components/AddNewFood";

export default function AddFood() {
    return (
        <div style={{ padding: 10 }} data-testid="add-food-page">
            <Flex wrap="wrap">
                <Heading className="heading">Add / Remove Food</Heading>
                <Spacer></Spacer>
                <VStack mb="10px">
                    <Button
                        as={NavLink}
                        to="/EditFood"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        Edit Food
                    </Button>
                    <Button
                        as={NavLink}
                        to="/UserStats"
                        colorScheme="red"
                        size="md"
                        variant="outline"
                    >
                        View Stats
                    </Button>
                </VStack>
            </Flex>
            <div>
                <NavBar></NavBar>
            </div>
            <Box w="100%" maxW="100vw">
                <br></br>
                <Grid templateColumns="repeat(20, minmax(0,1fr))" gap={4}>
                    <GridItem colStart={1} colEnd={7}>
                        <AddNewFood></AddNewFood>
                        {/* <Stack
                            w="full"
                            h="full"
                            p={10}
                            spacing={20}
                            alignItems="flex-start"
                        >
                            <Heading size="2xl">New Food</Heading>
                            <form onSubmit={handleSubmit}>
                                <SimpleGrid
                                    columns={6}
                                    columnGap={2}
                                    rowGap={2}
                                    w="full"
                                >
                                    <GridItem colSpan={6}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Name:</FormLabel>
                                            <Input
                                                isRequired
                                                name="name"
                                                value={name}
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={6}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Image Link:</FormLabel>
                                            <Input
                                                isRequired
                                                name="image"
                                                value={image}
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={6}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Description:</FormLabel>
                                            <Input
                                                isRequired
                                                name="desc"
                                                value={desc}
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={6}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Type:</FormLabel>
                                            <Input
                                                isRequired
                                                name="type"
                                                value={type}
                                                onChange={onChangeArray}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={6}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Ingredients:</FormLabel>
                                            <Input
                                                isRequired
                                                name="ingredients"
                                                value={ingredients}
                                                onChange={onChangeArray}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Rating:</FormLabel>
                                            <Input
                                                isRequired
                                                type="number"
                                                name="rating"
                                                value={rating}
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colStart={4} colEnd={7}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Price:</FormLabel>
                                            <Input
                                                isRequired
                                                type="number"
                                                name="price"
                                                value={price}
                                                onChange={onChange}
                                                mb={2}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={3}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Popular</FormLabel>
                                            <Checkbox
                                                type="checkbox"
                                                name="popular"
                                                id="popular"
                                                value="popular"
                                                colorScheme="red"
                                                onChange={(e) => {
                                                    setFood({
                                                        ...food,
                                                        popular:
                                                            e.target.checked
                                                    });
                                                }}
                                                mb={3}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colStart={4} colEnd={7}>
                                        <FormControl id="name" px={5}>
                                            <FormLabel>Spicy</FormLabel>
                                            <Checkbox
                                                type="checkbox"
                                                name="spicy"
                                                id="spicy"
                                                value="spicy"
                                                colorScheme="red"
                                                onChange={(e) => {
                                                    setFood({
                                                        ...food,
                                                        spicy: e.target.checked
                                                    });
                                                }}
                                                mb={3}
                                            />
                                        </FormControl>
                                    </GridItem>
                                    <GridItem colSpan={6}>
                                        <Button
                                            size="lg"
                                            w="full"
                                            type="submit"
                                            colorScheme="red"
                                            variant="solid"
                                        >
                                            Add
                                        </Button>
                                    </GridItem>
                                </SimpleGrid>
                            </form>
                        </Stack> */}
                    </GridItem>

                    <GridItem colStart={7} colEnd={20} h="10">
                        <Heading
                            size="2xl"
                            w="full"
                            h="full"
                            p={10}
                            alignItems="flex-start"
                        >
                            Menu
                        </Heading>
                        <RemoveFood></RemoveFood>
                    </GridItem>
                </Grid>
            </Box>
            <></>
            <br></br>
        </div>
    );
}
