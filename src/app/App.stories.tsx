import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReduxStoreProviderDecorator } from "../stories/ReduxStoreProviderDecorator";

export default {
  title: "AppWithRedux Component",
  component: App,
  decorators: [ReduxStoreProviderDecorator],
};

export const AppWithReduxBaseExample = () => {
  /*
    return <Provider store={store}><AppWithRedux/> </Provider>
    т.к. используем декоратор, то оборачивать не нужно
    */
  return <App />;
};
