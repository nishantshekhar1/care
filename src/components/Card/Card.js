import React from "react";
import "../../styles/Card/Card.css";

export const Card = ({ data }) => {
    const { key, value } = data;
    console.log(key, value);
    return (
        <div className="card">
            <h2>{`${key}`.toUpperCase()}</h2>
            <h1>{value}</h1>
        </div>
    )
}