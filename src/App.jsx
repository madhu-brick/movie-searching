import { useState } from "react";
import MovieCard from "./components/MovieCard";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import "./index.css";

function App() {
  const [allMovieData, setAllMovieData] = useState([]);
  const [searchMovie, setSearchMovie] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Fixed here

  const fetchMovieData = async () => {
    try {
      setLoading(true); // ✅ Fixed here
      const res = await fetch(`https://omdbapi.com/?s=${searchMovie}&apikey=11c79d40`);
      const data = await res.json();
      setAllMovieData(data.Search || []); // ✅ Add fallback if data.Search is undefined
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg">
        <SearchBar 
          searchMovie={searchMovie}
          setSearchMovie={setSearchMovie}
          fetchMovieData={fetchMovieData}
        />
        <MovieCard 
          allMovieData={allMovieData} 
          loading={loading} 
        />
      </div>
    </div>
  );
}

export default App;
