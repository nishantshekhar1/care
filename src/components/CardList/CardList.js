import React from "react";
// import { Card } from "antd";
import { Card } from "../Card/Card";
import "../../styles/CardList/CardList.css";

const CardList = ({ total }) => {

    let cards = Object.entries(total).map(([key, value]) => {
        console.log(key, value);
        return (
            <Card data={{ key, value }} />
        )
    });

    console.log(cards)
    return (<div className="cardList">{cards}</div>);
}

export default CardList;