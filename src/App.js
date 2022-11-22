import logo from './logo.svg';
import React from 'react';
import './scss/app.scss';
import Header from './Components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import FullPizza from './pages/FullPizza';
import { BrowserRouter, Routes, Route, Outlet} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// function Parent ({ children }) {
//   return (
//     <div>
//       <h1>Заголовок</h1>
//       <Outlet />
//       <h4>123123123</h4>
//     </div>
//   );
// }

function App() {
  return (
    // <div className="wrapper">
    //   <Header />
    //   <div className="content">
    //     <div className="container">
          <Routes> 
            <Route path='/' element={<MainLayout />}>
              <Route path='' element={<Home/>} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/pizza/:id' element={<FullPizza/>}/>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
    //     </div>
    //   </div>
    // </div>
  );
}

export default App;
