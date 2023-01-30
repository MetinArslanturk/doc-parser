import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DocumentPage from './routes/DocumentPage';

const router = createBrowserRouter([
  {
    path: '/doc/:documentName',
    element: <DocumentPage />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
