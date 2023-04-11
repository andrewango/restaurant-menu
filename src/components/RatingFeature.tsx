import React, { useState } from "react";
import { GrStar } from "react-icons/gr";
const [rating, setRating] = useState(0);
export function RatingFeature(): JSX.Element {
    return (
        <div>
            {[1, 2, 3, 4, 5].map((star, i) => {
                i = i + 1;
                return (
                    <div key={i}>
                        <input
                            type="radio"
                            name="star-rating"
                            value={i}
                            onClick={() => setRating(i)}
                        />
                        <GrStar
                            key={i}
                            className="star"
                            size={100}
                            color={i <= rating ? "#FFDD00" : "#D4D4D4"}
                        />
                    </div>
                );
            })}
        </div>
    );
}
