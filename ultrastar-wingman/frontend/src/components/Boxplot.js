// Boxplot.js
import React from 'react';
import ReactECharts from 'echarts-for-react';
import './Boxplot.css';

const processDataForBoxplots = (data) => {
    const players = {};

    // Group scores by player
    data.forEach(({player, score}) => {
        if (!players[player]) {
            players[player] = {scores: [], average: 0};
        }
        players[player].scores.push(score);
    });

    // Calculate boxplot data and average score for each player
    const playerData = Object.entries(players).map(([name, info]) => {
        const sortedScores = info.scores.sort((a, b) => a - b);
        const min = sortedScores[0];
        const q1 = percentile(sortedScores, 0.25);
        const median = percentile(sortedScores, 0.5);
        const q3 = percentile(sortedScores, 0.75);
        const max = sortedScores[sortedScores.length - 1];
        const average = sortedScores.reduce((sum, score) => sum + score, 0) / sortedScores.length;
        return {name, value: [min, q1, median, q3, max], average};
    });

    // Sort by average score
    playerData.sort((a, b) => a.average - b.average);

    return playerData;
};

const percentile = (arr, p) => {
    const pos = (arr.length - 1) * p;
    const base = Math.floor(pos);
    const rest = pos - base;
    if (arr[base + 1] !== undefined) {
        return arr[base] + rest * (arr[base + 1] - arr[base]);
    } else {
        return arr[base];
    }
};


function Boxplot({rawData}) {
    const data = processDataForBoxplots(rawData);

    console.log(data);

    const option = {
        title: {
            show: false
        },
        tooltip: {
            trigger: 'axis',
            confine: true,
            formatter: function (param) {
                console.log(param);
                console.log(data[param.dataIndex]);
                return [
                    '<b>' + param[0].name + '</b>',
                    'Max: ' + param[0].data[5],
                    'Q3: ' + param[0].data[4],
                    'Median: ' + param[0].data[3],
                    'Q1: ' + param[0].data[2],
                    'Min: ' + param[0].data[1]
                ].join('<br/>');
            }
        },
        xAxis: {
            name: 'Score',
            nameLocation: 'middle',
            nameGap: 30,
            scale: true
        },
        yAxis: {
            type: 'category',
            data: data.map(item => item.name),
        },
        color: ['#4b92cd', '#9e3b95'],
        series: [
            {
                name: 'Scores',
                type: 'boxplot',
                data: data.map(d => d.value),
                itemStyle: {
                    color: "#021720"
                }
            }
        ]
    };

    return <ReactECharts option={option} style={{height: 480}}/>;
}

export default Boxplot;
