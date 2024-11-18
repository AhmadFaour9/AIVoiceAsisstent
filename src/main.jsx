import ReactDOM from 'react-dom/client'

import store from './Redux/store';
import { Provider } from 'react-redux';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(

    <div>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
)
