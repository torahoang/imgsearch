/* eslint-disable prettier/prettier */
import SearchBar from './components/SearchBar'
import './index.css';
import SideBar from './components/SideBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SearchPage from './pages/search_page';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-full">
        <SideBar />
        <div className="flex-1 w-full">
          <Routes>
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
