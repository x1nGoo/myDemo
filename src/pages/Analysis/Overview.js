import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import GridContent from '@/components/PageHeaderWrapper/GridContent';

@connect(({ overview }) => ({
  overview,
}))
@Form.create()
class Overview extends Component {
  state = {
  };

  render() {
    return (
      <GridContent>
        <div>123</div>
      </GridContent>
    );
  }
}
export default Overview;
