import React from "react";
import "./App.css";
import { SelectRole } from "./components/SelectRole";

function App(): JSX.Element {
    return (
        <>
            <div className="App">
                <header className="App-header">Restaurant Menu</header>
                <hr></hr>
                <SelectRole></SelectRole>
            </div>
            <div>
                <ul>
                    <li>Gavin Caulfield</li>
                    <li>Ella Wilkins</li>
                    <li>Colby Frashure</li>
                    <li>Sehee Hwang</li>
                    <li>Andrew Ngo</li>
                </ul>
            </div>
        </>
    );
}

export default App;
