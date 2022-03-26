import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import { store } from "./State/store";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: "AppWithRedux Component",
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxBaseExample = () => {
    /*
    return <Provider store={store}><AppWithRedux/> </Provider>
    т.к. используем декоратор, то оборачивать не нужно
    */
    return <AppWithRedux/>
}