import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { Button, Modal, Row, Col, InputNumber } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
import { ColorPickerInput } from '@cloudwise-fe/chart-panel'

const ColorModal = ({ colors = [], onChange }) => {
	const [visible, changeVisible] = useState(false)
	const [settingColor, changeSettingColor] = useState([])

	useEffect(() => {
		if (colors && Object.entries(colors).length !== settingColor.length) {
			changeSettingColor(Object.entries(colors).sort((a, b) => a[0] - b[0]))
		}
	}, [colors])

	const handleColorChange = useCallback(
		(index, color, remove) => {
			let revColors = [...settingColor]
			if (remove) {
				revColors = revColors.filter((v, i) => i !== index)

			} else {
				if (typeof index === 'number') {
					revColors = revColors.map((v, i) => (i === index ? color : v))
				} else {
					revColors.push(revColors)
				}
			}
      changeSettingColor(revColors)
		},
		[settingColor]
	)

	const handleOk = useCallback(() => {
		if (!settingColor.length) {
			Modal.warning({ content: '您至少需要添加一个颜色!' })
		} else if (settingColor.length === 1 && Number(settingColor[0][0]) !== 1) {
			Modal.confirm({
				content:
					'检测到您仅设置了一个颜色, 但默认进度不为1, 是否要默认修改为1?若取消请重新手动修改配置',
				onOk: () => {
					const modifiySettingColors = [[1, settingColor[0][1]]]
					changeSettingColor(modifiySettingColors)
					onChange(Object.fromEntries(modifiySettingColors))
					changeVisible(false)
				},
			})
		} else {
			onChange(Object.fromEntries(settingColor))
			changeVisible(false)
		}
	}, [settingColor])
	return (
		<Fragment>
			<Button block onClick={() => changeVisible(true)}>
				设置颜色
			</Button>
			<Modal
				visible={visible}
				title="设置颜色"
				okText="确认"
				cancelText="取消"
				onOk={handleOk}
				onCancel={() => changeVisible(false)}
				closable={false}
				maskClosable={false}
			>
				{settingColor.map(([step, color], key) => (
					<Row key={key} justify="space-between" style={{ marginBottom: 20 }}>
						<Col span={17}>
							<ColorPickerInput
								gradientMode
								value={color}
								onChange={(value) => handleColorChange(key, [step, value])}
							/>
						</Col>
						<Col span={4}>
							<InputNumber
								min={0}
								max={1}
								value={step}
								step={0.1}
								onChange={(value) => handleColorChange(key, [value, color])}
							/>
						</Col>
						<Col span={2} style={{ textAlign: 'center', fontSize: 20 }}>
							<CloseCircleOutlined
								onClick={() => handleColorChange(key, null, true)}
							/>
						</Col>
					</Row>
				))}
				<Button
					block
					disabled={
						settingColor.length &&
						Number([...settingColor].reverse()[0][0]) === 1
					}
					onClick={() => handleColorChange(null, [1, '#000000'])}
				>
					添加颜色
				</Button>
			</Modal>
		</Fragment>
	)
}

export default ColorModal
