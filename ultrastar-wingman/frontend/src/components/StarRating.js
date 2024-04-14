// StarRating.js
import React from 'react';
import {FaStar, FaStarHalfAlt, FaRegStar} from "react-icons/fa";
import './StarRating.css';

const StarRating = ({ rating }) => {
    const totalStars = 5;
    let fullStars = Math.floor(rating);
    let halfStars = (rating % 1) !== 0 ? 1 : 0;
    let emptyStars = totalStars - fullStars - halfStars;

    return (
        <span className={"star-rating"}>
            {Array(fullStars).fill(<FaStar/>)}
            {halfStars === 1 && <FaStarHalfAlt/>}
            {Array(emptyStars).fill(<FaRegStar/>)}
        </span>
    );
};

export default StarRating;
