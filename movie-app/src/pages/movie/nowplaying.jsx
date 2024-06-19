import { useEffect, useState } from "react";
import axios from "axios";
import Movies from "../../components/Movies/Movies";
import Hero from "../../components/Hero/Hero"; 
 
function NowPlaying() {
  // Simpan API_KEY dan URL ke variabel
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`; 

  // Membuat state movies
  const [movies, setMovies] = useState([]);  

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getNowPlaying();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getNowPlaying() {
        // Fetch data dari Axios
        const response = await axios(URL)

        // Simpan data ke state movies
        setMovies(response.data.results);
  }

  return (
    <>
      <Hero />
      <Movies movies={movies}/>       
    </>
  )
}

export default NowPlaying