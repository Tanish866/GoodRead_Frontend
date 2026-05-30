import './index.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import Store from './Redux/Store';

createRoot(document.getElementById('root')).render(
    <Provider store={Store}>
        <App />
    </Provider>
);
