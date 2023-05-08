import React, { useState } from "react";
import {
    TabPanel,
    FormControl,
    SimpleGrid,
    Button,
    GridItem,
    FormLabel,
    Input,
    Checkbox
} from "@chakra-ui/react";
import { foodProps } from "../interfaces/Food";
import { EditMenuList } from "./EditFoodList";
import { MenuList } from "../pages/AddFood";
import "./EditFoodStyles.css";

export default function EditFoodTabs({
    editName,
    editImage,
    editDesc,
    editRating,
    editType,
    editIngredients,
    editPopular,
    editSpicy,
    editPrice
}: {
    editName: string;
    editImage: string;
    editDesc: string;
    editRating: number;
    editType: string[];
    editIngredients: string[];
    editPopular: boolean;
    editSpicy: boolean;
    editPrice: number;
}): JSX.Element {
    const [foodlist, setFoodlist] = useState<foodProps[]>(MenuList());

    const [food, setFood] = useState<foodProps>({
        name: editName,
        image: editImage,
        desc: editDesc,
        rating: editRating,
        type: editType,
        ingredients: editIngredients,
        popular: editPopular,
        spicy: editSpicy,
        price: editPrice
    });

    const {
        name,
        image,
        desc,
        rating,
        type,
        ingredients,
        price,
        popular,
        spicy
    } = food;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFood({
            ...food,
            [name]: value
        });
    };

    const onChangeArray = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newStr = value.split(",");

        setFood({
            ...food,
            [name]: newStr
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
        location.reload();
    };

    const onSubmit = () => {
        const newFoodList: foodProps[] = foodlist.map(
            (original: foodProps): foodProps => {
                return editName === original.name ? food : original;
            }
        );
        const newEditFoodList: foodProps[] = EditMenuList().map(
            (original: foodProps): foodProps => {
                return editName === original.name ? food : original;
            }
        );
        setFoodlist(newFoodList);
        sessionStorage.setItem("menu", JSON.stringify(newFoodList));
        sessionStorage.setItem("editFoodList", JSON.stringify(newEditFoodList));
    };

    return (
        <TabPanel>
            <form onSubmit={handleSubmit}>
                <SimpleGrid columns={4} columnGap={5} rowGap={2} w="full">
                    <GridItem colSpan={4}>
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
                    <GridItem colSpan={4}>
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
                    <GridItem colSpan={4}>
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
                    <GridItem colSpan={4}>
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
                    <GridItem colSpan={4}>
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
                    <GridItem colSpan={2}>
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
                    <GridItem colStart={3} colEnd={5}>
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
                    <GridItem colSpan={2}>
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
                                        popular: e.target.checked
                                    });
                                }}
                                mb={3}
                                defaultChecked={editPopular}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colStart={3} colEnd={5}>
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
                                defaultChecked={editSpicy}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Button
                            type="submit"
                            //className="editfood-btn"
                            size="lg"
                            w="full"
                            colorScheme="red"
                            variant="solid"
                            isDisabled={
                                name === editName &&
                                image === editImage &&
                                desc === editDesc &&
                                rating == editRating &&
                                type.toString() === editType.toString() &&
                                ingredients.toString() ===
                                    editIngredients.toString() &&
                                popular === editPopular &&
                                spicy === editSpicy &&
                                price == editPrice
                            }
                        >
                            Edit
                        </Button>
                    </GridItem>
                </SimpleGrid>
            </form>
        </TabPanel>
    );
}
