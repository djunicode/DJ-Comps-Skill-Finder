import React from 'react';


import app from './app.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<app/>, document.getElementById('react-app'));
registerServiceWorker();
