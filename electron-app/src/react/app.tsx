import { createRoot } from 'react-dom/client';
import Gallery from './Component/Gallery/Gallery';

const container = document.getElementById('react-app');
const root = createRoot(container);
const app = <Gallery/>;
root.render(app);