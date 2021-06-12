import React from "react";
import "../../styles/Card/Card.css";

export const Card = ({ data }) => {
    const { key, value, color } = data;
    console.log(key, value);
    return (
        <div className="card" style={{color: color}}>
            <h3>{`${key}`.toUpperCase()}</h3>
            <h2>{value}</h2>
        </div>
    )
}