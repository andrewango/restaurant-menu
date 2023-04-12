import React from "react";
import "./App.css";
import { SelectRole } from "./components/SelectRole";
import RatingFeature from "./components/RatingFeature";

function App(): JSX.Element {
    return (
        <>
            <div className="App">
                <header className="App-header">Restaurant Menu</header>
                <p>
                    Gavin Caulfield, Ella Wilkins, Colby Frashure, Sehee Hwang,
                    Andrew Ngo
                </p>
            </div>
            <hr></hr>
            <RatingFeature></RatingFeature>
            <hr></hr>
        </>
    );
}

export default App;
