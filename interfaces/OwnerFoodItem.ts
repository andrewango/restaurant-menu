import { foodProps } from "./Food";

export interface ownerFoodProps extends foodProps {
    name: string;
    image: string;
    desc: string;
    rating: number;
    type: string[];
    ingredients: string[];
    popular: boolean;
    spicy: boolean;
}
