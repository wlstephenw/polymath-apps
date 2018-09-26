// @flow

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Loading } from 'carbon-components-react';
import { isMobile } from 'react-device-detect';
import PolymathAuth, {
  NETWORK_MAIN,
  NETWORK_KOVAN,
} from '@polymathnetwork/ui/components/EthNetworkWrapper';
import { MetamaskStatus, NotSupportedPage } from '@polymathnetwork/ui';

import Root from './components/Root';
import SplashPage from './components/SplashPage';
import routes from './routes';

type Props = {
  location: {
    pathname: string,
    [any]: any,
  },
};

class RouteLoader extends Component<Props> {
  render() {
    if (isMobile) {
      return (
        <Root>
          <DummyPage />
        </Root>
      );
    } else if (this.props.location.pathname === '/') {
      // noinspection RequiredAttributes
      return (
        <Root>
          <SplashPage />
        </Root>
      );
    }
    const networks = [NETWORK_MAIN, NETWORK_KOVAN];
    return (
      <PolymathAuth
        loading={<Loading />}
        guide={<MetamaskStatus networks="Mainnet or Kovan" />}
        networks={networks}
      >
        {renderRoutes(routes)}
      </PolymathAuth>
    );
  }
}

export default withRouter(RouteLoader);
