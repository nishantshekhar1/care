import React from "react";
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory10 } from 'd3-scale-chromatic';
import "../../styles/Graph/Graph.css";
import { BarChart, AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Cell } from "recharts";

const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
          Z`;

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    console.log(props);
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

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
        // <div className="graph">
        // <ResponsiveContainer>
        //     <BarChart
        //         // width={500}
        //         // height={300}
        //         data={data}
        //         margin={{
        //             top: 20,
        //             right: 30,
        //             left: 20,
        //             bottom: 5
        //         }}
        //     >
        //         <CartesianGrid strokeDasharray="3 3" />
        //         <XAxis dataKey="date" />
        //         <YAxis />
        //         <Legend/>
        //         <Bar
        //             dataKey="active"
        //             fill="#8884d8"
        //             shape={<TriangleBar />}
        //             label={{ position: "top" }}
        //         >
        //             {data.map((entry, index) => (
        //                 <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        //             ))}
        //         </Bar>
        //     </BarChart>
        // </ResponsiveContainer>
        // </div>

        // <div className="graph">
            <ResponsiveContainer>
                <AreaChart
                    // width={500}
                    // height={300}
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area type="monotone" dataKey="active" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        // </div>
    )
}

export default Graph;

