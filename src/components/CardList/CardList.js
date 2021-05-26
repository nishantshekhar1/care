import React from "react";
import { Card } from "antd";
import "../../styles/CardList/CardList.css";

const CardList = ({ total }) => {

    let cards = Object.entries(total).map(([key, value]) => {
        console.log(key, value);
        return (
            <Card title={key} style={{ width: 150 }}>
                {value}
            </Card>
        )
    });

    console.log(cards)
    return (<div className="cardList">{cards}</div>);
}

export default CardList;