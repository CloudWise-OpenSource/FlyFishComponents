import { ScenegraphLayer } from '@deck.gl/mesh-layers'
import { TextLayer } from '@deck.gl/layers'

export const getModelLayer = (data) => new ScenegraphLayer(data)

export const getModelTextLayer = (data) =>
  new TextLayer({
    getText: (d) => d.name,
    getSize: 12,
    getTextAnchor: 'middle',
    getAlignmentBaseline: 'center',
    ...data,
    sizeScale: 1
  })
