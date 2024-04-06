import { redirect } from 'react-router-dom';
import MasterView from './master-view/master-view';
export const routes = [
  { index: true, loader: () => redirect('master-view') },
  { path: 'master-view', element: <MasterView />, text: 'Master View' }
];
