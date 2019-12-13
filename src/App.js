import React from "react";
import { Provider } from "react-redux";
import ReduxToastr from "react-redux-toastr";

import store from "./redux/store/index";
import Routes from "./routes/Routes";


import {browserHistory} from 'services/history';
import { syncHistoryWithStore } from 'react-router-redux';
const history = syncHistoryWithStore(browserHistory, store);


const App = () => (
  <Provider store={store}>
    <Routes history={history}/>
    <ReduxToastr
      timeOut={5000}
      newestOnTop={true}
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      preventDuplicates
      progressBar
      closeOnToastrClick
    />
  </Provider>
);

export default App;
