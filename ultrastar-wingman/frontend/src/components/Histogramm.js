// Histogramm.js
import React, {useEffect, useRef} from 'react';
import ReactECharts from 'echarts-for-react';
import './Histogramm.css';

const nHistogramCategories = 20;
const histogramCategories = [];

for (let i = 0; i < nHistogramCategories; i++) {
    if (i === nHistogramCategories - 1) {
        histogramCategories.push((i % 2 === 1 ? "\n" : "") + `${i * (10000 / nHistogramCategories)} - ${(i + 1) * (10000 / nHistogramCategories)}`)
    } else {
        histogramCategories.push((i % 2 === 1 ? "\n" : "") + `${i * (10000 / nHistogramCategories)} - ${(i + 1) * (10000 / nHistogramCategories) - 1}`)
    }
}

function Histogramm({data}) {
    let histogramData = new Array(nHistogramCategories).fill(0);

    // data is ordered
    for (const score of data) {
        histogramData[Math.min(Math.floor(score.score / (10000 / nHistogramCategories)), nHistogramCategories - 1)]++;
    }

    const dataLabelRef = useRef(null);

    const option = {
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        legend: {
            show: false
        },
        credits: {
            enabled: false
        },
        colors: ["#c93535"],
        xAxis: {
            type: "category",
            data: histogramCategories,
            nameLocation: "middle",
            axisLabel: {interval: 0},
            splitLine: {show: false},
            crosshair: true,
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            splitLine: {
                show: false
            },
        },
        grid: {
            // left: 16,
            // top: 10,
            // right: 16,
            // bottom: 40,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0,
                groupPadding: 0,
                shadow: false
            }
        },
        series: [{
            name: 'Scores in Range',
            type: 'bar',
            barWidth: '100%',
            data: histogramData,
            itemStyle: {
                color: "#4b92cd"
            },
            emphasis: {
                itemStyle: {
                    color: "#9e3b95"
                }
            }
        }]
    };

    const onSeriesSelect = (e) => {
        if (e.componentType !== "series") return;
        if (dataLabelRef.current) {
            dataLabelRef.current.innerHTML = `<span class="value">${e.data}</span> scores in range <span class="range">${e.name.trim()}</span>`;
        }
    };

    const onEvents = {
        click: onSeriesSelect,
        mouseover: onSeriesSelect
    };

    return <div className={"histogramm"}>
        <label ref={dataLabelRef} className={"data"}>Select bar for details</label>
        <ReactECharts option={option} style={{height: 80}} onEvents={onEvents}/>
        <label className={"x-axis left"}>0</label>
        <label className={"x-axis right"}>10000</label>
    </div>;
}

export default Histogramm;
