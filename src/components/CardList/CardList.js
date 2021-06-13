import React from "react";
import { Card } from "../Card/Card";
import "../../styles/CardList/CardList.css";

const CardList = ({ total }) => {

    let colors = ["#FFAA33", "red", "green", "#de6ade", "#0088ff"];
    let index = 0;

    if(Object.keys(total).length > 5)
        colors.splice(4, 0, "#cc62b9")
    let cards = Object.entries(total).map(([key, value]) => {
        console.log(key, value);
        const card = <Card data={{ key, value, color: colors[index] }} />;
        index++;
        return (card)
    });

    console.log(cards)
    return (<div className="cardList">{cards}</div>);
}

export default CardList;