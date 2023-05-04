import React from "react";
import EditFood from "./pages/EditFood";
import Landing from "./pages/Landing";
import EditUsers from "./pages/EditUsers";
import AboutUs from "./pages/AboutUs";
//Routing
import { Routes, Route } from "react-router-dom";
import AddFood from "./pages/AddFood";
import RemoveFood from "./pages/RemoveFood";
import OwnerLanding from "./pages/OwnerLanding";
import ManageFoods from "./pages/ManageFoods";
import UserStats from "./pages/UserStats";

// 3. Pass the `theme` prop to the `ChakraProvider`
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/EditUsers" element={<EditUsers />}></Route>
            <Route path="/EditFood" element={<EditFood />}></Route>
            <Route path="/AboutUs" element={<AboutUs />}></Route>
            <Route path="/AddFood" element={<AddFood />}></Route>
            <Route path="/RemoveFood" element={<RemoveFood />}></Route>
            <Route path="/OwnerLanding" element={<OwnerLanding />}></Route>
            <Route path="/ManageFoods" element={<ManageFoods />}></Route>
            <Route path="/UserStats" element={<UserStats />}></Route>
        </Routes>
    );
}
