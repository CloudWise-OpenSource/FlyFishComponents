import config from 'data-vi/config'

export const uploadAPI = DATAVI_ENV && DATAVI_ENV.screenAPI ? (DATAVI_ENV.screenAPI.uploadScreenImg || config.screenAPI.uploadScreenImg) : config.screenAPI.uploadScreenImg
export const deleteAPI = DATAVI_ENV && DATAVI_ENV.screenAPI ? (DATAVI_ENV.screenAPI.deleteUploadScreenImg || config.screenAPI.deleteUploadScreenImg) : config.screenAPI.deleteUploadScreenImg