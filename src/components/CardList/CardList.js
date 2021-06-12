import React from "react";
// import { Card } from "antd";
import { Card } from "../Card/Card";
import "../../styles/CardList/CardList.css";

const CardList = ({ total }) => {

    const colors = ["#FFAA33", "red", "green", "purple", "blue"];
    let index = 0;
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