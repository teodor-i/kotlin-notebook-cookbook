import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { MainPage, NotebookPage } from './pages';
import './App.css';

const basename = import.meta.env.BASE_URL || '/';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <BrowserRouter basename={basename}>
      <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
        <Header onThemeToggle={handleThemeToggle} isDarkMode={isDarkMode} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/notebook/:id" element={<NotebookPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
