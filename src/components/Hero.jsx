import React, { useEffect, useState } from 'react';
import axios from 'axios';
import endpoints, { createImageUrl } from '../services/movieServices';

const Hero = () => {
    const [movie, setMovie] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(endpoints.popular)
            .then((res) => {
                const movies = res.data.results;
                const randomMovie = movies[Math.floor(Math.random() * movies.length)];
                setMovie(randomMovie);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch movies');
                setLoading(false);
            });
    }, []);

    const truncate = (str, len) => {
        if (!str) return '';
        return str.length > len ? str.slice(0, len) + '...' : str;
    };

    if (loading) {
        return (
            <div className="w-full h-[550px] lg:h-[850px] flex justify-center items-center">
                <p className="text-white">Fetching movies...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full h-[550px] lg:h-[850px] flex justify-center items-center">
                <p className="text-white">{error}</p>
            </div>
        );
    }

    const { title, backdrop_path, release_date, overview } = movie;

    return (
        <div className="w-full h-[550px] lg:h-[850px] relative">
            <div className="absolute w-full h-full bg-gradient-to-r from-black" />
            <img
                className="w-full h-full object-cover object-top"
                src={createImageUrl(backdrop_path, 'original')}
                alt={title}
            />
            <div className="absolute w-full top-[10%] lg:top-[25%] p-8 md:px-8 py-16">
                <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
                <div className="mt-8 mb-4">
                    <button className="capitalize border bg-gray-300 text-black py-2 px-5">
                        Play
                    </button>
                    <button className="capitalize border border-gray-300 py-2 px-5 ml-4">
                        Watch Later
                    </button>
                </div>
                <p className="text-gray-400 text-lg">{release_date}</p>
                <p className="w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200">
                    {truncate(overview, 250)}
                </p>
            </div>
        </div>
    );
};

export default Hero;
