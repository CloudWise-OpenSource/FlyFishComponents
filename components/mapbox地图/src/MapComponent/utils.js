import { cloneDeep } from 'lodash-es'

export const wrapperGeoJson = (raw) => {
  const data = cloneDeep(raw);
  const { features } = data
  if(!features) {
    return {}
  }
  const newFeatures = features.map((feature) => {
    if (!feature.properties) {
      feature.properties = {}
    }
    return feature
  })
  return {
    ...data,
    features: newFeatures
  }
}