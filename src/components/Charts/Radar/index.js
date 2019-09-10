import React, { Component } from 'react';
import { Chart, Tooltip, Geom, Coord, Axis, Legend } from 'bizcharts';
import { DataView } from '@antv/data-set';
import { Row, Col, Divider } from 'antd';
import classNames from 'classnames';
import autoHeight from '../autoHeight';
import styles from './index.less';

/* eslint react/no-danger:0 */
@autoHeight()
class Radar extends Component {
  state = {
    legendData: [],
  };

  componentDidMount() {
    this.getLegendData();
  }

  componentDidUpdate(preProps) {
    const { data } = this.props;
    if (data !== preProps.data) {
      this.getLegendData();
    }
  }

  getG2Instance = chart => {
    this.chart = chart;
  };

  // for custom lengend view
  getLegendData = () => {
    if (!this.chart) return;
    const geom = this.chart.getAllGeoms()[0]; // 获取所有的图形
    if (!geom) return;
    const items = geom.get('dataArray') || []; // 获取图形对应的

    const legendData = items.map(item => {
      // eslint-disable-next-line
      const origins = item.map(t => t._origin);
      const result = {
        name: origins[0].name,
        color: item[0].color,
        checked: true,
        value: origins.reduce((p, n) => p + n.value, 0),
      };

      return result;
    });

    this.setState({
      legendData,
    });
  };

  handleRef = n => {
    this.node = n;
  };

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    legendData[i] = newItem;

    const filteredLegendData = legendData.filter(l => l.checked).map(l => l.name);

    if (this.chart) {
      this.chart.filter('name', val => filteredLegendData.indexOf(val) > -1);
      this.chart.repaint();
    }

    this.setState({
      legendData,
    });
  };

  render() {
    const defaultColors = [
      '#1890FF',
      '#FACC14',
      '#2FC25B',
      '#8543E0',
      '#F04864',
      '#13C2C2',
      '#fa8c16',
      '#a0d911',
    ];

    const {
      data = [],
      height = 0,
      title,
      valueFormat,
      offsetY = 0,            // 原本的legend 图例 Y 方向的偏移值
      position,               // 原本的legend位置
      originalLegend = false, // 原本的legend
      hasLegend = false,      // 自定义legend
      rightLegend = false,    // legend 显示位置, 是否在图表右侧显示, 默认显示在图表底部
      forceFit = true,
      tickCount = 5,
      padding = [35, 30, 16, 30],
      animate = true,
      colors = defaultColors,
    } = this.props;

    const { legendData } = this.state;

    const scale = {
      value: {
        min: 0,
        tickCount,
        formatter: (value) => value.toFixed(2)
      },
    };

    // 将value 转换为 number 类型
    const dv = new DataView();
    dv.source(data).transform({
      type: 'map',
      callback(row) { // 加工数据后返回新的一行，默认返回行数据本身
        row.value *= 1;
        return row;
      }
    });

    const chartHeight = height - (hasLegend ? 80 : title ? 22 : 0);

    return (
      <div className={styles.radar} style={{ height }}>
        {title && <h4>{title}</h4>}
        <div className={classNames({
            [styles.horizontalLayout]: rightLegend,
          })}
        >
          <Chart
            scale={scale}
            height={chartHeight}
            forceFit={forceFit}
            data={dv}
            padding={padding}
            animate={animate}
            onGetG2Instance={this.getG2Instance}
          >
            <Tooltip />
            <Coord type="polar" />
            <Axis
              name="label"
              line={null}
              tickLine={null}
              grid={{
                lineStyle: {
                  lineDash: null,
                },
                hideFirstLine: false,
              }}
            />
            <Axis
              name="value"
              grid={{
                type: 'polygon',
                lineStyle: {
                  lineDash: null,
                },
              }}
            />
            <Legend visible={originalLegend} position={position} offsetY={offsetY} />
            <Geom type="line" position="label*value" color={['name', colors]} size={1} />
            <Geom
              type="point"
              position="label*value"
              color={['name', colors]}
              shape="circle"
              size={3}
            />
          </Chart>
        </div>
        {hasLegend && !rightLegend && (
          <Row className={styles.legend}>
            {legendData.map((item, i) => (
              <Col
                span={24 / legendData.length}
                key={item.name}
                onClick={() => this.handleLegendClick(item, i)}
              >
                <div className={styles.legendItem}>
                  <p>
                    <span
                      className={styles.dot}
                      style={{
                        backgroundColor: !item.checked ? '#aaa' : item.color,
                      }}
                    />
                    <span>{item.name}</span>
                  </p>
                  <h6>{item.value}</h6>
                </div>
              </Col>
            ))}
          </Row>
        )}
        {
          rightLegend && (
            <ul className={styles.rightLegend}>
              {legendData.map((item, i) => (
                <li key={item.name} onClick={() => this.handleLegendClick(item, i)}>
                  <span
                    className={styles.dot}
                    style={{
                      backgroundColor: !item.checked ? '#aaa' : item.color,
                    }}
                  />
                  <span className={styles.legendTitle}>{item.name}</span>
                  {/* <Divider type="vertical" />
                  <span className={styles.value}>{valueFormat ? valueFormat(item.value) : item.value}</span> */}
                </li>
              ))}
            </ul>
          )
        }
      </div>
    );
  }
}

export default Radar;
