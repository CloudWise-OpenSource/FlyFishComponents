# 组件说明

1. 组件配置双坐标轴 ，通过在系列中配置seriseIndex 配置对应的坐标轴
2. 组件百分比系列数据有使用序列化函数numberHandle 重新计算百分比，保证不超过100%，



# 组件使用

1.  需要展示数值和百分比时可以使用该组件

# 依赖项

```javascript
{
    "echarts": "^5.3.0",
    "echarts-for-react": "^3.0.2"
  }
```

# 默认数据

```javascript
        return [{
            "year": "2015",
            "scale": 240.9,
            "growthRate": 0.15
        },
        {
            "year": "2016",
            "scale": 309.35,
            "growthRate": 0.284
        },
        {
            "year": "2017",
            "scale": 368,
            "growthRate": 0.19
        },
        {
            "year": "2018",
            "scale": 492.75,
            "growthRate": 0.339
        },
        {
            "year": "2019",
            "scale": 611.05,
            "growthRate": 0.24
        },
        {
            "year": "2020",
            "scale": 688.02,
            "growthRate": 0.126
        }
    ];
```
# 其他说明
1.  本模板组件开发时使用分辨率较大，需要根据需求变更字体大小
2.  本组件支持缩放

