import { createRoot } from 'react-dom/client';
import Gallery from './Component/Gallery/Gallery';
import Factory from './Component/Factory/Factory';
import Library from './Component/Library/Library';
import { HashRouter } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../react/store/store';

const container = document.getElementById('react-app');
const root = createRoot(container);
const app = (
    <HashRouter>
        <Provider store={store}>
            <Routes>
                <Route path='/Gallery' element={<Gallery/>}/>
                <Route path='/Factory' element={<Factory/>}/>
                <Route path='/Library' element={<Library/>}/>
                <Route path='/' element={<Navigate to="/Gallery"/>}/>
            </Routes>
        </Provider>
    </HashRouter>
);
root.render(app);