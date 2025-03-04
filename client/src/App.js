import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import AddNewBlog from './pages/addBlog';

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route>
          <Route exact path="/" element={<Home />} />
          <Route path="/addBlog" element={<AddNewBlog />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
