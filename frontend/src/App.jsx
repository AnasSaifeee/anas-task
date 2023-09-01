
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoSearch from './components/PhotoSearch';
import Results from './components/Results';
import './index.css'
function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<PhotoSearch />} />
            <Route path="/results/:query" element={<Results />} />
          </Routes>
        </Router>
    
    </>
  )
}

export default App
