import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './pages/auth';
import { Navbar } from './components/Navbar';
import Task from './pages/task';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/tasks' element={<Task />}/>
          <Route path='/auth' element={<Auth />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
