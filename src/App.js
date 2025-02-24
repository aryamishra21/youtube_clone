import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AppLayout from './components/AppLayout';
import HomePage from './pages/HomePage';
import WatchPage from './pages/WatchPage';
import SearchResultsPage from './pages/SearchResultsPage';

const route=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'results',
        element:<SearchResultsPage/>
      },
      {
        path:'watch',
        element:<WatchPage/>
      }
    ]
  }
])
function App() {
  return <RouterProvider router={route}/>
}

export default App;
