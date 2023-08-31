
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoSearch from './components/PhotoSearch';
import './index.css'
function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path="/" element={<PhotoSearch />} />
          </Routes>
        </Router>
    
    </>
  )
}

export default App
