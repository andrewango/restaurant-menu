import React from "react";
import Edit from "./pages/editFood";
import Landing from "./pages/landing";
import Users from "./pages/editUsers";
import AboutUs from "./pages/aboutus";
//Routing
import { Routes, Route } from "react-router-dom";

// 3. Pass the `theme` prop to the `ChakraProvider`
export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route path="/users" element={<Users />}></Route>
            <Route path="/edit" element={<Edit />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
        </Routes>
    );
}
