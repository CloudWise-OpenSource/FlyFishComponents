import React, { useMemo } from 'react';
import ReactECharts from 'echarts-for-react';
import 'echarts-wordcloud';

export default function WordCloud({ data }) {
    const getOptions = useMemo(() => {
        const option = {
            tooltip: {
                show: true,
                position: 'top',
                textStyle: {
                    fontSize: 30
                }
            },
            series: [{
                type: 'wordCloud',
                gridSize: 10,
                shape: 'circle',
                sizeRange: [10, 40],
                rotationRange: [0, 0],
                left: 'center',
                top: 'center',
                right: null,
                bottom: null,
                width: '100%',
                height: '100%',
                drawOutOfBound: false,
                textStyle: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 200 + 55),
                            Math.round(Math.random() * 200 + 55),
                            Math.round(Math.random() * 200 + 55)
                        ].join(',') + ')';
                    },

                },
                data: data
            }]
        };
        return option;
    }, [data]);

    return (
        <ReactECharts option={getOptions} style={{ width: '100%', height: '100%' }}/>
    )
}

