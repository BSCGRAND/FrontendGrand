import ReactDOM from 'react-dom';
import './index.css';
import {template} from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(template, document.getElementById('root'));

serviceWorker.unregister();
