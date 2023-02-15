import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import './assets/index.less';


//透明部分样式
var placeHolderStyle = {
    normal: {
        color: 'rgba(0,0,0,0)',
        label: { show: false },
        labelLine: { show: false }
    },
    emphasis: {
        color: 'rgba(0,0,0,0)'
    }
};
//环样式
var dataStyle = {
    normal: {
        label: { show: false },
        labelLine: { show: false },
        c: 40,
        shadowColor: 'rgba(40, 40, 40, 0.5)',
    }
};
const RatioPie = (props) => {
    const { data, fontSize, lineColor, radio, show } = props;

    const options = useMemo(() => {
        const opt = {
            tooltip: {
                show: true,
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: show == 1 ? true : false,
                itemGap: fontSize,
                textStyle: {
                    color: '#fff'
                },
                bottom: '5%',
                data: ['01', '02', '03', '04', '05', '06']
            },
            series: data.length === 0 ? {} : data.map((v, i) => {
                return {
                    name: `'Line ${i + 1}'`,
                    type: 'pie',
                    clockWise: false,
                    //环形位置
                    // radius : [180 - i * 20,200 - i * 20],
                    radius: [`${(5 - i) * 12.5}%`, `${(6 - i) * 12.5}%`],
                    itemStyle: dataStyle,
                    hoverAnimation: false,
                    data: [
                        //环形数据
                        {
                            value: v.value,
                            name: v.name
                        },
                        //透明部分数据
                        {
                            value: v.total - v.value,
                            name: 'invisible',
                            itemStyle: placeHolderStyle
                        }
                    ]
                }
            })
        }
        if (radio == 1) opt.color = lineColor
        return opt;
    }, [data, fontSize, lineColor, radio]);
    return (
        <div className="ff-component-62afd60671b746202637c8eb">
            <ReactEcharts
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
                notMerge={true}
                option={options}
            />
        </div>
    );
}

export default RatioPie;
