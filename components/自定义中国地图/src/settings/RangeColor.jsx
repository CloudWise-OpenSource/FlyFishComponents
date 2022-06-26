import React, { useState, useEffect, useCallback } from 'react';
import {
  ANTPREFIX,
  ChartProvider,
  ColorPickerInput,
} from '@cloudwise-fe/chart-panel';
import {
  Modal,
  ConfigProvider,
  Row,
  Col,
  Empty,
  InputNumber,
  Button,
} from 'antd';

ConfigProvider.config({
  prefixCls: ANTPREFIX,
});

export default ({ rangeColor = [], onChange }) => {
  const [colors, setColors] = useState([]);
  const [visible, changeVisible] = useState(false);

  useEffect(() => {
    setColors(rangeColor);
  }, [rangeColor]);

  const handleDelete = useCallback(
    (idx) => {
      const latestColors = [...colors];
      latestColors.splice(idx, 1);
      setColors(latestColors);
    },
    [colors],
  );

  const handleAdd = useCallback(
    (changeValue, idx, valueOrColor) => {
      if (typeof changeValue === 'undefined') {
        setColors([...colors, []]);
      } else {
        console.log(changeValue, idx, valueOrColor);
        const [value, color] = colors[idx] || [];
        const latestColor = [...colors];
        latestColor.splice(
          idx,
          1,
          valueOrColor ? [changeValue, color] : [value, changeValue],
        );
        setColors(latestColor);
      }
    },
    [colors],
  );

  return (
    <ChartProvider>
      <ConfigProvider prefixCls={ANTPREFIX}>
        <Button block onClick={() => changeVisible(true)}>
          设置区间色值
        </Button>
        <Modal
          visible={visible}
          destroyOnClose
          title="区间色值设置"
          onOk={() => {
            onChange(colors);
            changeVisible(false);
          }}
          onCancel={() => changeVisible(false)}
        >
          {colors.length ? (
            colors.map(([value, color], idx) => (
              <Row
                key={idx}
                justify="space-between"
                style={{ marginBottom: 20 }}
              >
                <Col span={8}>
                  <InputNumber
                    style={{ width: '100%' }}
                    value={value}
                    placeholder={`请输入第${idx + 1}个区间值`}
                    min={0}
                    onChange={(changeValue) =>
                      handleAdd(changeValue, idx, true)
                    }
                  />
                </Col>
                <Col span={10}>
                  <ColorPickerInput
                    value={color}
                    placeholder={`请输入第${idx + 1}个颜色值`}
                    onChange={(changeColor) => handleAdd(changeColor, idx)}
                  />
                </Col>
                <Col span={4}>
                  <Button danger block onClick={() => handleDelete(idx)}>
                    删除
                  </Button>
                </Col>
              </Row>
            ))
          ) : (
            <Empty description="暂未设置颜色区间" />
          )}
          <Row justify="center">
            <Button type="primary" onClick={() => handleAdd()}>
              添加
            </Button>
          </Row>
        </Modal>
      </ConfigProvider>
    </ChartProvider>
  );
};
