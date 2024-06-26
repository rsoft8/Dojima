import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/AccountSlice";
import optioningReducer from "./slices/OptionSlice";
import appReducer from "./slices/AppSlices";
import pendingTransactionsReducer from "./slices/PendingTxnsSlice";
// import poolDataReducer from "./slices/PoolThunk";
import messagesReducer from "./slices/MessagesSlice";
// import IDOReducer from "./slices/IDOSlice";

// reducers are named automatically based on the name field in the slice
// exported in slice files by default as nameOfSlice.reducer

const store = configureStore({
  reducer: {
    //   we'll have state.account, state.optioning, etc, each handled by the corresponding
    // reducer imported from the slice file
    account: accountReducer,
    optioning: optioningReducer,
    app: appReducer,
    pendingTransactions: pendingTransactionsReducer,
    // // poolData: poolDataReducer,
    messages: messagesReducer,
    // ido: IDOReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
