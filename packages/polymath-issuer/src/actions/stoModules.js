// @flow
import { getSTOModules } from '../utils/contracts';

import type { RootState } from '../redux/reducer';
import type { Dispatch } from 'redux';
import type { ExtractReturn } from '../redux/helpers';
import type { STOModuleType } from '../constants';

export const STO_MODULES_UPDATE = 'STO_MODULES_UPDATE';

type UpdateParams = {|
  type: STOModuleType,
  description: string,
  setupCost: number,
  name: string,
  ownerAddress: number,
  address: string,
|};

export const update = (stoModules: UpdateParams[]) => ({
  type: STO_MODULES_UPDATE,
  payload: { stoModules },
});

export type FetchParams = {|
  type: STOModuleType,
|};

export const fetch = () => {
  return async (
    dispatch: Dispatch<UpdateAction>,
    getState: () => RootState
  ) => {
    const { token } = getState();
    const securityToken = token.token;
    if (!securityToken) {
      throw new Error(
        'Called stoModules.fetch action before having a security token in the state'
      );
    }

    const moduleDetails = await getSTOModules(securityToken.address);

    dispatch(update(moduleDetails));
  };
};

export type UpdateAction = ExtractReturn<typeof update>;
