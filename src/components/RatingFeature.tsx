import React, { useState } from "react";
import { GrStar } from "react-icons/gr";
export default function RatingFeature(): JSX.Element {
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
                            key={i}
                            className="star"
                            size={100}
                            color={i <= rating ? "#FFDD00" : "#D4D4D4"}
                        />
                    </label>
                );
            })}
        </div>
    );
}
