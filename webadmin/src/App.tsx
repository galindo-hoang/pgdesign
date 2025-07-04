import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DetailProjectPage from './pages/DetailProjectPage';
import CategoryProjectPage from './pages/CategoryProjectPage';
import ContentProjectPage from './pages/ContentProjectPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CategoryProjectPage/>}/>
        <Route path="/detail" element={<DetailProjectPage/>}/>
        <Route path="/content" element={<ContentProjectPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
