import logo from './logo.svg';
import React from 'react';
import './scss/app.scss';
import Header from './Components/Header'
import Categories from './Components/Categories';
import Sort from './Components/Sort';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

export const SearchContext = React.createContext();


function App() {
  const [searchValue, setSearchValue] = React.useState('');
  console.log(searchValue, "Input changed:");
  return (
    <div className="wrapper">
      {/* Provider оповещает все вложенные элементы, о том что есть контекст */}
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header />
      <div className="content">
        <div className="container">
          <Routes> 
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          {/* <Cart /> */}
        </div>
      </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
