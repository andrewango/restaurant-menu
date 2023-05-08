import React, { useState } from "react";
import { GrStar } from "react-icons/gr";
export default function RatingFeature(): JSX.Element {
    /*
    Renders 5 stars, all initally zero (and gray). Clicking a star fills in
    that one and all ones before it, making them yellow!!
    Each star has a respective rating from 1-5. The stars operate identically
    to radio buttons (because they literally are, they're just hidden!)
    */
    const [rating, setRating] = useState(0);
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star, i) => {
                i = i + 1;
                return (
                    <label key={i}>
                        <input
                            type="radio"
                            name="star-rating"
                            value={i}
                            onClick={() => setRating(i)}
                            style={{ display: "none" }}
                        />
                        <GrStar
                            data-testid="star-icon"
                            key={i}
                            className="star"
                            size={20}
                            color={i <= rating ? "#FFDD00" : "#D4D4D4"}
                        />
                    </label>
                );
            })}
        </div>
    );
}
