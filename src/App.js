import { Route, Routes } from 'react-router';
import './App.css';
import Front from './pages/Front';
import News from './pages/News';
import Packs from './pages/Packs';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Front />}/>
        <Route path='/packs' element={<Packs />} />
        <Route path='/news' element={<News />} />
      </Routes>
    </div>
  );
}

export default App;
