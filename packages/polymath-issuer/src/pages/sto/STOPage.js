// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loading } from 'carbon-components-react';
import type { SecurityToken } from '@polymathnetwork/js/types';
import { NotFoundPage } from '@polymathnetwork/ui';

import { fetch } from '../../actions/sto';
import {
  STAGE_SELECT,
  STAGE_CONFIGURE,
  STAGE_OVERVIEW,
} from '../../reducers/sto';
import SelectSTOTemplate from './components/SelectSTOTemplate';
import OverviewSTO from './components/OverviewSTO';
import ConfigureSTO from './components/ConfigureSTO';
import type { RootState } from '../../redux/reducer';

import './style.scss';

type StateProps = {|
  token: ?SecurityToken,
  stage: number,
|};

type DispatchProps = {|
  fetch: () => any,
|};

const mapStateToProps = (state: RootState): StateProps => ({
  token: state.token.token,
  stage: state.sto.stage,
});

const mapDispatchToProps: DispatchProps = {
  fetch,
};

type Props = StateProps & DispatchProps;

class STOPage extends Component<Props> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    const { token } = this.props;
    if (!token || !token.address) {
      return <NotFoundPage />;
    }
    switch (this.props.stage) {
      case STAGE_SELECT:
        return <SelectSTOTemplate />;
      case STAGE_CONFIGURE:
        return <ConfigureSTO />;
      case STAGE_OVERVIEW:
        return <OverviewSTO />;
      default:
        return <Loading />;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(STOPage);
