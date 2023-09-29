'use strict';

import 'mapbox-gl/dist/mapbox-gl.css';
import BaseComponent from "data-vi/ReactComponent"
import { isFunction, call } from "data-vi/helpers";;

import { MapComponent } from './MapComponent'

export default class Component extends BaseComponent {
    // 默认配置
    static defaultConfig = {};
    // 默认选项
    static defaultOptions = {
      center: [-74.0066, 40.7135],
      zoom: 10,
      bearing: 0,
      pitch: 45,
      initialAnimation: false,
      longitude: -74.0066,
      latitude: 40.7135,
    };
    // 系统事件
    static events = {};
    // 是否加载css文件 如当前组件没有样式文件，设置为false
    static enableLoadCssFile = true;

    // 获取默认选项
    getDefaultOptions() {
      return this.constructor.defaultOptions;
    }

    // 获取默认事件
    getDefaultData() {
      return {
        geojson: {
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                // properties: {},
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
              _animations: {
                '*': { speed: 5 },
              },
              getPosition: (d) => [d.coordinates[0], d.coordinates[1], 0],
              getOrientation: [0, 0, 0],
              getScale: [1, 1, 1],
              data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
              sizeScale: 50,
              pickable: true,
              transitions: {
                getPosition: 1000 * 0.9
              }
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
      };
    }
    
    getReactComponent() {
      return MapComponent;
    }

    load(options = {}, onSuccess = null, onError = null) {
      if (this.hasDataSource()) {
        if (isFunction(options)) {
          /* eslint-disable no-param-reassign */
          onError = onSuccess;
          onSuccess = options;
          options = {};
          /* eslint-enable no-param-reassign */
        }
        // 加载数据事件
        this.trigger('load');
        this.dataSource.load(
          options,
          (data) => {
            console.log('load', data)
            call(onSuccess, this, data);
            // 数据加载完成事件
            this.trigger('loaded', data);
            this.draw(data);
          },
          onError
        );
      }
      return this;
    }
    
}