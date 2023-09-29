## Mapbox 地图

### Options

#### Zoom
- 输入控件，用于设置缩放级别。
- 输入的值应为数字。

#### Bearing
- 输入控件，用于设置方位角。
- 输入的值应为数字。

#### Pitch
- 输入控件，用于设置俯仰角。
- 输入的值应为数字。

#### Longitude
- 输入控件，用于设置经度。
- 输入的值应为数字。

#### Latitude
- 输入控件，用于设置纬度。
- 输入的值应为数字。

#### Initial Animation
- 单选控件，用于设置是否开启初始动画。
- 可选择的值有：
  - 开启
  - 关闭

#### Access Token
- 输入控件，用于设置访问令牌。
- 输入的值应为字符串。
- 令牌的获取方式请参考 [mapbox 官方文档](https://docs.mapbox.com/help/how-mapbox-works/access-tokens/)。

### 数据结构

```js
{
  geojson: {
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-67.13734, 45.13745],
                [-66.96466, 44.8097],
                [-68.03252, 44.3252],
                [-69.06, 43.98],
                [-70.11617, 43.68405],
                [-70.64573, 43.09008],
                [-70.75102, 43.08003],
                [-70.79761, 43.21973],
                [-70.98176, 43.36789],
                [-70.94416, 43.46633],
                [-71.08482, 45.30524],
                [-70.66002, 45.46022],
                [-70.30495, 45.91479],
                [-70.00014, 46.69317],
                [-69.23708, 47.44777],
                [-68.90478, 47.18479],
                [-68.2343, 47.35462],
                [-67.79035, 47.06624],
                [-67.79141, 45.70258],
                [-67.13734, 45.13745],
              ],
            ],
          },
        },
      ],
    },
  },
  model: {
    data: [
      {
        scenegraph: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scenegraph-layer/airplane.glb',
        getPosition: (d) => [d.coordinates[0], d.coordinates[1], 0],
        getOrientation: [0, 0, 0],
        getScale: [1, 1, 1],
        data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
        sizeScale: 50,
        pickable: true,
      },
    ],
    showText: true,
  },
  dom: {
    data: [
      {
        coordinates: [-74.02, 40.7135],
        id: 'containerMaker',
        message: 'hello',
      },
      {
        coordinates: [-74.0066, 41],
        classname: 'marker-222',
        style:
          'height:80px;width:80px;background-image:url(https://unsplash.it/80/80/?random)',
      },
    ],
  },
  marker: {
    data: [{ coordinates: [-74.0, 40.7135] }],
  },
}
```

#### geojson

标准 geojson 特征集合。

- **data**:
  - **type**: 数据类型，例如 'FeatureCollection'。
  - **features**: 特征数组，每一个特征包括：
    - **type**: 特征类型，例如 'Feature'。
    - **geometry**: 
      - **type**: 几何类型，例如 'Polygon'。
      - **coordinates**: 坐标数组。

#### model

模型资源，与 deck.gl 中的 `ScenegraphLayer` 对应。

- **data**: 数据数组，包括：
  - **scenegraph**: 模型的URL地址。
  - **getPosition**: 函数，返回模型的位置。
  - **getOrientation**: 模型的方向。
  - **getScale**: 模型的缩放。
  - **data**: 数据的URL地址。
  - **sizeScale**: 尺寸缩放比例。
  - **pickable**: 是否可选。
- **showText**: 是否显示文本，布尔值。

#### dom

用于在地图上显示 HTML 元素。

- **data**: 数据数组，包括：
  - **coordinates**: 坐标。
  - **id** (optional): 标识。
  - **message** (optional): 消息。
  - **classname** (optional): CSS类名。
  - **style** (optional): 样式。

#### marker

基本标记，对应 mapbox marker。

- **data**: 数据数组，包括：
  - **coordinates**: 坐标。


