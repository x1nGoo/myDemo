import { getVerificationCode, submitRegisterg } from '@/services/lmapi';

export default {
  namespace: 'cloudRegister',

  state: {
    status: undefined,
    env: '',
  },

  effects: {
    *getCode({ payload, callback }, { call }) {
      const response = yield call(getVerificationCode, payload);
      if (callback) callback(response)
    },
    *submit({ payload, callback }, { call, put }) {
      const response = yield call(submitRegisterg, payload);
      yield put({
        type: 'registerHandle',
        payload: response,
      });
      if (callback) callback(response)
    }
  },

  reducers: {
    registerHandle(state, { payload }) {
      return {
        ...state,
        status: payload.code === 200 ? 'ok' : undefined,
      };
    }
  },
};
