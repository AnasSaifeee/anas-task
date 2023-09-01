import  { useState } from 'react';
import {useNavigate} from 'react-router-dom'
function PhotoSearch() {
 
  
const navigate=useNavigate()
const [query, setQuery] = useState(localStorage.getItem('lastQuery') || '');
  const searchPhotos = async () => {
    localStorage.setItem('lastQuery', query);
    navigate(`/results/${query}`)
  };



  return (

    <div className="flex h-screen justify-center items-center  bg-gray-200 ">
    <header className="w-full p-4 text-center">
      <div className="mt-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for photos"
          className="px-2 py-1 rounded border outline-none"
        
        />
        <button
          onClick={searchPhotos}
          className="px-4 py-2 bg-blue-500 text-white rounded ml-2"
        >
          Search
        </button>
      </div>
    
    </header>
   
 


 
  </div>
  );
}

export default PhotoSearch;
