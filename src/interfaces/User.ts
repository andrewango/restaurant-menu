import { foodProps } from "./Food";

export interface userProps {
    name: string;
    orderID: number;
    order: foodProps[];
    role: "Owner" | "Employee" | "Customer";
}
