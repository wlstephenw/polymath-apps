// TODO @grsmto: This has nothing to do in this package as it's not UI related.
// This could probably go in the new `polymath-shared` package.
import axios from 'axios';

let code;
let sig;
let address;
const instance = axios.create({
  baseURL:
    process.env.REACT_APP_POLYMATH_OFFCHAIN_ADDRESS ||
    'https://polymath-offchain.herokuapp.com/',
});

const res = (response: Object) => {
  if (response.status !== 200) {
    throw new Error(response.statusText);
  }
  if (response.data.status !== 'ok') {
    // FIXME @RafaelVidaurre: Manage this errors correctly, not throwing for now
    // since offchain is expected to fail silently because of unhandled promise
    // rejections being ignored by older versions of this code
    console.error(response.data.data);
    return;
  }
  return response.data.data;
};

const get = async (url: string) => {
  return res(await instance.get(url));
};

export const post = async (url: string, params: Object) => {
  return res(await instance.post(url, params));
};

export const getAuthCode = async (address: string) => {
  return get('/verification-code/' + address);
};

export const auth = async (_code: string, _sig: string, _address: string) => {
  code = _code;
  sig = _sig;
  address = _address;
  return post('/auth', { code, sig, address });
};

export const newEmail = async (email: string, name: string) => {
  return post('/email/new', { email, name, code, sig, address });
};

export const confirmEmail = async (pin: string) => {
  return post('/email/confirm', { pin });
};

export const providersApply = async (data: Object, networkId: string) => {
  return post('/providers/apply', {
    ...data,
    code,
    sig,
    address,
    networkId,
  });
};

export const notice = async (scope: string) => {
  return get('/notice/' + scope);
};
