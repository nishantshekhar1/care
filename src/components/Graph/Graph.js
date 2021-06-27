import React from "react";
import "../../styles/Graph/Graph.css";
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

export const Graph = ({ weekData }) => {

    console.log("Graph Component", weekData);

    let filtereWeekData = Object.keys(weekData).filter((date) => date !== "total");
    let data = filtereWeekData.map((date) => {
        let item = {
            date: date,
            active: weekData[date]["confirmed"]
        };
        return item;
    });

    return (
        <ResponsiveContainer>
            <AreaChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}
            >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" />
                <YAxis />
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <Tooltip />
                <Area type="monotone" dataKey="active" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

export default Graph;

