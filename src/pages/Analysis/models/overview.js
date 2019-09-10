export default {
  namespace: 'overview',
  state: {

  },
  effects: {
  },
  reducers: {
    saveState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};
