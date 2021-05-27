import React from "react";
import { BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

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
        <div className="graph">
            <ResponsiveContainer>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" fill="#8884d8" background={{ fill: '#eee' }} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph;

