/* eslint-disable react/prop-types */
import 'mapbox-gl/dist/mapbox-gl.css'
import { useRef, useState, useEffect, useMemo, useCallback } from 'react'
import { message } from 'antd'
import { StaticMap, _MapContext as MapContext, NavigationControl, AttributionControl, Layer, Source, Marker } from 'react-map-gl'
import DeckGL, { FlyToInterpolator } from 'deck.gl';
import { onLoadInit } from './layers'
import { getModelLayer  } from './layers/model'
import FlyPosition from './controls/flyPosition'
import geojsonValidation from 'geojson-validation'
import { wrapperGeoJson } from './utils'
import { GLTFLoader } from '@loaders.gl/gltf';
import { registerLoaders } from '@loaders.gl/core';
import { TextLayer } from '@deck.gl/layers'

registerLoaders([GLTFLoader]);

const skyLayer = {
  id: 'sky',
  type: 'sky',
  paint: {
    'sky-type': 'atmosphere',
    'sky-atmosphere-sun': [0.0, 0.0],
    'sky-atmosphere-sun-intensity': 15,
  },
}

export const MapComponent = (props) => {
  const { data, initialAnimation, accessToken } = props
  const {
    geojson: rawGeojson = { data: {} },
    model = { data: [] },
    dom = { data: [] },
    marker = { data: [] },
  } = data
  const geojson = wrapperGeoJson(rawGeojson.data || {})

  useEffect(() => {
    if (!geojsonValidation.valid(geojson)) {
      console.log(geojson)
      message.error('GeoJSON 格式错误，请检查')
    }
  }, [geojson])

  useEffect(() => {
    if (!accessToken) {
      message.error('accessToken is required')
    }
  }, [accessToken])

  const options = useMemo(
    () => ({
      zoom: props.zoom,
      bearing: props.bearing,
      pitch: props.pitch,
      longitude: props.longitude,
      latitude: props.latitude,
      transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    }),
    [props.zoom, props.bearing, props.pitch, props.longitude, props.latitude]
  )

  const [viewState, setViewState] = useState(options)
  const initialAnimationRef = useRef(initialAnimation)

  const mapboxRef = useRef(null)

  useEffect(() => {
    initialAnimationRef.current = initialAnimation
  }, [initialAnimation])

  useEffect(() => {
    if (initialAnimationRef.current) {
      setViewState({ ...options, zoom: options.zoom - 3 })
      initialAnimationRef.current = false
    } else {
      setViewState(options)
    }
  }, [options])

  const onSelectPosition = useCallback(({ longitude, latitude }) => {
    setViewState((pre) => ({
      ...pre, latitude, longitude, transitionDuration: 2000,
      transitionInterpolator: new FlyToInterpolator()
    }))
  }, [])

  const pointLayerStyle = useMemo(
    () => ({
      id: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 4,
        'circle-color': '#007cbf',
      },
    }),
    []
  )
  const polygonLayerStyle = useMemo(
    () => ({
      id: 'geojson-data',
      type: 'fill',
      paint: {
        'fill-color': '#0080ff',
        'fill-opacity': 0.5,
      },
    }),
    []
  )
  const outlineLayerStyle = useMemo(
    () => ({
      id: 'outline',
      type: 'line',
      paint: {
        'line-color': '#000',
        'line-width': 2,
      },
    }),
    []
  )

  const modelData = model.data
  const showText = model.showText
  const modelLayers = modelData.map((item) => getModelLayer(item))

  const textLayer =  showText ? modelData.map((item) => new TextLayer({
      getText: (d) => d.name,
      getSize: 12,
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      ...item,
      sizeScale: 1,
      getPosition: (d) => [d.coordinates[0], d.coordinates[1] - 0.005, 0],
    })) : []

  const domData = dom.data
  const markerData = marker.data || []

  if (!accessToken) {
    return <div>accessToken is required</div>
  }


  return (
    <div style={{ height: '600px', width: '1000px' }}>
      <DeckGL
        layers={[textLayer, modelLayers]}
        viewState={viewState}
        onViewStateChange={({ viewState }) => { setViewState({ ...viewState }) }}
        controller={true}
        ContextProvider={MapContext.Provider}
      >
        <div style={{ margin: 10, position: 'absolute', zIndex: 1 }}>
          <NavigationControl />
        </div>
        <AttributionControl
          style={{
            fontFamily: 'sans-serif',
            fontSize: 14,
            right: 0,
            bottom: 0
          }}
        />
        {markerData.map((item, idx) => {
          const { coordinates = [0, 0], ...markerProps } = item
          return (
            <Marker
              key={idx}
              longitude={coordinates[0]}
              latitude={coordinates[1]}
              {...markerProps}
            >
              <svg height="24" version="1.1" width="24" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 -1028.4)"><path d="m12.031 1030.4c-3.8657 0-6.9998 3.1-6.9998 7 0 1.3 0.4017 2.6 1.0938 3.7 0.0334 0.1 0.059 0.1 0.0938 0.2l4.3432 8c0.204 0.6 0.782 1.1 1.438 1.1s1.202-0.5 1.406-1.1l4.844-8.7c0.499-1 0.781-2.1 0.781-3.2 0-3.9-3.134-7-7-7zm-0.031 3.9c1.933 0 3.5 1.6 3.5 3.5 0 2-1.567 3.5-3.5 3.5s-3.5-1.5-3.5-3.5c0-1.9 1.567-3.5 3.5-3.5z" fill="#c0392b" /><path d="m12.031 1.0312c-3.8657 0-6.9998 3.134-6.9998 7 0 1.383 0.4017 2.6648 1.0938 3.7498 0.0334 0.053 0.059 0.105 0.0938 0.157l4.3432 8.062c0.204 0.586 0.782 1.031 1.438 1.031s1.202-0.445 1.406-1.031l4.844-8.75c0.499-0.963 0.781-2.06 0.781-3.2188 0-3.866-3.134-7-7-7zm-0.031 3.9688c1.933 0 3.5 1.567 3.5 3.5s-1.567 3.5-3.5 3.5-3.5-1.567-3.5-3.5 1.567-3.5 3.5-3.5z" fill="#e74c3c" transform="translate(0 1028.4)" /></g></svg>
            </Marker>
          )
        })}

        <StaticMap
          ref={mapboxRef}
          style={{ height: '600px' }}
          attributionControl={false}
          onViewportChange={(nextViewport) => setViewState(nextViewport)}
          mapStyle="mapbox://styles/mapbox/light-v11"
          mapboxApiAccessToken={accessToken}
          onLoad={(evt) => {
            if (initialAnimation) {
              setViewState((pre) => ({
                ...pre,
                zoom: options.zoom,
                bearing: options.bearing,
                pitch: options.pitch,
                longitude: options.longitude,
                latitude: options.latitude,
                transitionDuration: 2000,
                transitionInterpolator: new FlyToInterpolator()
              }))
            }
            onLoadInit(evt.target)
          }}
        >
          <Layer {...skyLayer} />
          <Source id="geojson-data" type="geojson" data={geojson}>
            <Layer {...pointLayerStyle} />
            <Layer {...polygonLayerStyle} />
            <Layer {...outlineLayerStyle} />
          </Source>
        </StaticMap>

        {domData.map((item, idx) => (
          <CustomMarkers item={item} key={idx} mapRef={mapboxRef} />
        ))}

      </DeckGL>

      {/* <DeckGLOverlay layers={[...modelLayers, ...textLayer]} /> */}
      <FlyPosition onSelectPosition={onSelectPosition} />

    </div>
  )
}

export const CustomMarkers = ({ item }) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const el = ref.current
      const width = (item.iconSize && item.iconSize[0]) || 50
      const height = (item.iconSize && item.iconSize[1]) || 50

      if (item.className) {
        el.className = item.className
      }
      if (item.message) {
        el.addEventListener('click', () => {
          window.alert(item.message)
        })
      }
      if (item.html) {
        el.innerHTML = item.html
      }
      if (item.style) {
        el.setAttribute('style', item.style)
      }
      if (item.id) {
        el.id = item.id
      }

      if (!item.style && !item.html && !item.className) {
        el.style.backgroundImage = `url(https://unsplash.it/50/50/?random)`
        el.style.width = `${width}px`
        el.style.height = `${height}px`
        el.style.backgroundSize = '100%'
      }

    }
  }, [item])

  return <Marker
    longitude={item.coordinates[0]}
    latitude={item.coordinates[1]}
  >
    <div ref={ref} />
  </Marker>
}
