import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DocumentPage from './routes/DocumentPage';
import HomePage from './routes/HomePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/doc/:documentName',
    element: <DocumentPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
