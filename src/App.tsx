import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainLayout from './components/layout/main';
import HomeScreen from './components/_screen/home';
import AboutUs from './components/_screen/about';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
