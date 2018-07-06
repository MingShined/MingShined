export default {
  namespace: "localStorage",

  state: {
    messageList: (() => {
      let messageList = localStorage.getItem("messageList");
      if (messageList) {
        return JSON.parse(messageList);
      }
      return [];
    })(),
    userName: localStorage.getItem("userName") || ""
  },

  effects: {
    *getUserInfo({ payload }, { call, put, select }) {
      // eslint-disable-line
      let curMessageList = yield select(
          state => state.localStorage.messageList
        ),
        userName = payload.userName;
      if (curMessageList) curMessageList.push(payload);
      yield put({ type: "saveUserInfo", curMessageList, userName });
    },
    *deleteComemnt({ payload }, { put, select }) {
      let curMessageList = yield select(
        state => state.localStorage.messageList
      );
      curMessageList.splice(payload, 1);
      yield put({ type: "saveUserInfo", curMessageList });
    }
  },

  reducers: {
    saveUserInfo(state, action) {
      localStorage.setItem(
        "messageList",
        JSON.stringify(action.curMessageList)
      );
      localStorage.setItem("userName", action.userName);
      return { ...state, messageList: [...action.curMessageList] };
    }
  }
};
