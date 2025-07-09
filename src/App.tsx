import { BrowserRouter as Router, Route, Routes } from 'react-router';
import MainLayout from './components/layout/main';
import HomeScreen from './components/_screen/home';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
