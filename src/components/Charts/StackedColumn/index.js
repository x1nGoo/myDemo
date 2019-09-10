import React, { Component } from 'react';
import { Chart, Axis, Tooltip, Geom, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';
import Debounce from 'lodash-decorators/debounce';
import Bind from 'lodash-decorators/bind';
import autoHeight from '../autoHeight';

import styles from './index.less';

@autoHeight()
class StackedColumn extends Component {
  state = {
    autoHideXLabels: false,
    xTickCount: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  handleRoot = n => {
    this.root = n;
  };

  handleRef = n => {
    this.node = n;
  };

  @Bind()
  @Debounce(400)
  resize() {
    if (!this.node) {
      return;
    }
    const canvasWidth = this.node.parentNode.clientWidth;
    const { data = [], autoLabel = true } = this.props;
    if (!autoLabel) {
      return;
    }
    const minWidth = data.length * 30;
    const { autoHideXLabels } = this.state;

    if (canvasWidth <= minWidth) {
      if (!autoHideXLabels) {
        this.setState({
          autoHideXLabels: true,
        });
      }
    } else if (autoHideXLabels) {
      this.setState({
        autoHideXLabels: false,
      });
    }
  }

  render() {
    const {
      height,
      title,
      forceFit = true,
      data = [],
      x,
      y,
      renameMap = [],
      fieldsMap = [],
      padding = 'auto',
    } = this.props;

    if(!data) {
      return null;
    }

    const ds = new DataSet();
    const dv = ds.createView().source(data);
    dv.transform({
      type: 'rename',   // 字段重命名
      map: renameMap,
    })
    .transform({
      type: 'fold',
      fields: fieldsMap, // 展开字段集
      key: x, // key字段
      value: y, // value字段
    });

    const { autoHideXLabels, xTickCount } = this.state;
    const scale = {
      x: {
        tickCount: xTickCount && xTickCount,
      },
      y: {
        min: 0,
      },
    };

    const yLabel = {
      formatter: val => {
        if (val >= 10000) {
          return `${val / 1000}K`;
        }
        return val;
      },
    };

    return (
      <div style={{ height }} ref={this.handleRoot}>
        <div ref={this.handleRef}>
          {title && <h4 className={styles.title}>{title}</h4>}
          <Chart height={height} padding={padding} data={dv} scale={scale} forceFit={forceFit}>
            <Legend position="top" />
            <Axis
              name={x}
              label={autoHideXLabels ? false : {}}
              tickLine={autoHideXLabels ? false : {}}
            />
            <Axis name={y} label={yLabel} />
            <Tooltip />
            <Geom type='intervalStack' position={`${x}*${y}`} color="name" style={{stroke: '#fff',lineWidth: 1}} />
          </Chart>
        </div>
      </div>
    );
  }
}

export default StackedColumn;
