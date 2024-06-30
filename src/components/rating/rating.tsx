import React, { useState } from "react";
import StarIcon from "../../assets/star.tsx";
import styles from "../../style/rating.module.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/redux";
import { rateFilm } from "../../redux/entities/films";

type RatingProps = {
    rating?: number;
    filmId: number;
};
const Rating: React.FC<RatingProps> = ({ filmId }) => {
    const auth = useAppSelector((state) => state.authReducer.auth);
    const token = useAppSelector((state) => state.authReducer.token);
    const dispatch = useAppDispatch();

    let filmRating: string | null | number = localStorage.getItem("film_ratings");
    filmRating = !!filmRating
        ? JSON.parse(filmRating)[filmId] !== null
            ? Number(JSON.parse(filmRating)[filmId])
            : 0
        : 0;

    const [rating, setRating] = useState(filmRating);
    const [hover, setHover] = useState(0);
    const colors = {
        orange: "#FF5500",
        gray: "#ABABAB",
    };

    const handleClick = (newIndex: number, e: any) => {
        e.stopPropagation();
        if (rating !== newIndex) {
            setRating(newIndex);
            dispatch(rateFilm({ rating: newIndex, filmId: String(filmId), token: String(token) }));
        }
        return false;
    };
    if (auth) {
        const stars = Array.from({ length: 5 }, (_, index) => {
            const newIndex = index + 1;
            return (
                <div
                    key={"star" + newIndex}
                    className={styles.star}
                    onClick={(e) => handleClick(newIndex, e)}
                    onMouseEnter={() => setHover(newIndex)}
                    onMouseLeave={() => setHover(0)}
                >
                    <StarIcon
                        fill={
                            hover > 0
                                ? newIndex <= hover
                                    ? colors.gray
                                    : undefined
                                : newIndex <= rating
                                ? colors.orange
                                : undefined
                        }
                        borderColor={hover === 0 && newIndex <= rating ? colors.orange : colors.gray}
                    />
                    <span className={hover === 0 && newIndex <= rating ? styles.blackNumber : styles.number}>
                        {newIndex}
                    </span>
                </div>
            );
        });
        return <div className={styles.stars}>{stars}</div>;
    } else {
        <></>;
    }
};

export default Rating;
