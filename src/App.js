import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';

import browserHistory from 'services/browserHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import store from './redux/store';
import Routes from './routes/Routes';

const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
	<Provider store={store}>
		<Routes history={history} />
		<ReduxToastr
			timeOut={5000}
			newestOnTop
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
