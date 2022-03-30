import React from 'react'
import { ComponentOptionsSetting } from 'datavi-editor/templates'
import {
  ChartProvider,
  FormItemGroup,
  FormItem,
  Collapse,
  CollapsePanel,
  RadioBooleanGroup,
} from '@cloudwise-fe/chart-panel'
import { Upload, ConfigProvider, Button, message } from 'antd'
import { uploadAPI, deleteAPI } from '../api'
import { apiRequest } from 'data-vi/api'

ConfigProvider.config({
  prefixCls: 'ant4',
});

export default class OptionsSetting extends ComponentOptionsSetting {
  enableLoadCssFile = true
  constructor(props) {
    super(props)
  }

  state = {
    uploading: false,
    screen_id: '41'
  }

  /**
   * 获取Tabs项
   */
  getTabs() {
    return {
      config: {
        label: '其他',
        content: () => this.otherPanel(),
      },
    }
  }

  /**
   * 配置其他
   */
  otherPanel() {
    const { options = {}, updateOptions } = this.props
    const { screen_id, uploading } = this.state

    return (
      <ChartProvider>
        <ConfigProvider prefixCls="ant4">
          <Collapse>
            <CollapsePanel title="视频设置" key="1">
              <FormItemGroup
                onValuesChange={(changeValues) => updateOptions(changeValues)}
                initialValues={options}
              >
                <FormItem name="autoPlay" label="自动播放">
                  <RadioBooleanGroup />
                </FormItem>
                <FormItem name="controls" label="显示控制">
                  <RadioBooleanGroup />
                </FormItem>
                <FormItem name="loop" label="循环">
                  <RadioBooleanGroup />
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
            <CollapsePanel title="数据设置" key="2">
              <FormItemGroup
                initialValues={options}
              >
                <FormItem
                  name="videoUrl"
                  label="视频地址"
                  tooltip="优先级低于接口返回地址"
                  valuePropName="file"
                  getValueFromEvent={e => {
                    if (e.uuid) {
                      return e;
                    } else {
                      return e && e.file;
                    }
                  }}
                >
                  <Upload.Dragger
                    maxCount={1}
                    data={{ screen_id }}
                    disabled={uploading}
                    loading={uploading}
                    showUploadList={true}
                    action={uploadAPI}
                    // beforeUpload={this.handleBeforeUpload}
                    onChange={this.onChange}
                  >
                    <Button disabled={uploading} loading={uploading}>点击或拖拽上传视频</Button>
                  </Upload.Dragger>
                </FormItem>
              </FormItemGroup>
            </CollapsePanel>
          </Collapse>
        </ConfigProvider>
      </ChartProvider>
    )
  }

  // 上传前移除当前视频
  handleBeforeUpload = (file) => {
    this.setState({
      uploading: false,
    })
    const { videoUrl } = this.props.options
    return new Promise((resolve) => {
      if (videoUrl && videoUrl.length) {
        apiRequest({
          url: deleteAPI,
          type: 'POST',
          dataType: 'json',
          contentType: 'application/json',
          data: JSON.stringify({
            imgName: videoUrl.split('/').slice(-1).pop(),
            screen_id: this.state.screen_id,
          }),
        }).done(() => {
          resolve(file)
        })
      } else {
        resolve(file)
      }
    }).catch((e) => { message.error(`remove pre file error.`); reject(e) })
  }

  onChange = (info) => {
    if (info.file.status !== 'uploading') {
      this.setState({
        uploading: false
      })
    }
    if (info.file.status === 'done') {
      this.props.updateOptions({ videoUrl: info.file.response.data })
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
}

