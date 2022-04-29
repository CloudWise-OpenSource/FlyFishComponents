import ReactComponent from 'data-vi/ReactComponent'
import PropTypes from 'prop-types'
import React, { useMemo, memo, useEffect, useRef } from 'react'
import { Empty } from 'antd'
import 'antd/lib/empty/style/index.css'
import { transformImageUrl } from 'data-vi/helpers'
import './index.less'

const Video = memo(({ data, videoUrl, controls, autoPlay, loop, parent }) => {
  const videoSourceUrl = useMemo(() => {
    if (data && data.videoUrl && data.videoUrl.length) {
      return data.videoUrl
    }
    return transformImageUrl(videoUrl)
  }, [data, videoUrl])

  const ref = useRef();
  useEffect(() => {
    parent.bind('playOrPauseVideo', () => {
      const myVideo = ref.current;
      if (myVideo) {
        if (myVideo.paused)
          myVideo.play();
        else
          myVideo.pause();
      }
    });
    parent.bind('reNew', () => {
      const myVideo = ref.current;
      if (myVideo) {
        myVideo.currentTime = 0
        myVideo.play();
      }
    });
  }, [])

  return (
    <div className={`ff-component-video-flow-wrapper${videoSourceUrl ? '' : ' ff-component-video-flow-wrapper-background'}`}>
      {!videoSourceUrl ? (
        <Empty description="当前无视频源, 请检查!" />
      ) : (
        <video
          ref={ref}
          className="ff-component-video-flow"
          controls={controls}
          autoPlay={autoPlay}
          loop={loop}
          src={videoSourceUrl}
        />
      )}
    </div>
  )
})

Video.propTypes = {
  /**
   * @description 视频地址
   * @default null
   */
  videoUrl: PropTypes.string,
  /**
   * @description 自动播放
   * @default false
   */
  autoPlay: PropTypes.bool,
  /**
   * @description 显示控制
   * @default true
   */
  controls: PropTypes.bool,
  /**
   * @description 循环
   * @default false
   */
  loop: PropTypes.bool,
}

export default class Component extends ReactComponent {
  static enableLoadCssFile = true
  // 默认选项
  static defaultOptions = {
    videoUrl: null,
    autoPlay: false,
    controls: true,
    loop: false,
  }

  getDefaultConfig() {
    return {
      left: 534,
      top: 200,
      width: 1000,
      height: 700,
      visible: true,
    }
  }

  getDefaultData() {
    return { videoUrl: '' }
  }

  getReactComponent() {
    return Video
  }
}
