
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import {StyledHero, Leftside, Rightside } from "./Hero.styled";
import axios from "axios";

function Hero () {

// Membuat State movie
const [movie, setMovie] = useState("");
const API_KEY = process.env.REACT_APP_API_KEY;
const genres = movie && movie.genres.map((genre) => genre.name).join(", ");
const trailer = movie && `https://www.youtube.com/watch?v=${movie.videos.results[0].key}`

useEffect(getDetailMovie, []);


async function getTrendingMovies() {
    const URL = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
    const response = await axios(URL);
    return response.data.results[Math.floor(Math.random() * 5)]; 
}


async function getDetailMovie() {
    const trendingMovie = await getTrendingMovies();
    const id = trendingMovie.id;   

    // fetch detail movie by id
    const URL = `https://api.themoviedb.org/3/movie/${id},?api_key=${API_KEY}&append_to_response=videos`
    const response = await axios(URL);
    console.log(response);

    setMovie(response.data)
}

return(
    <StyledHero>
        <section>
            <Leftside>
                <h2>{movie.title}</h2>
                <h3>{genres}</h3>
                <p>{movie.overview}</p>
                <Button variant="primary" size="lg" as="a" href={trailer} target="_blank">Watch</Button>
            </Leftside>
            <Rightside>
                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
            </Rightside>    
        </section>
    </StyledHero>            
);
}

export default Hero;