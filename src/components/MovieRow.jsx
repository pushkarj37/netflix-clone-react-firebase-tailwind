import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MovieItem from './MovieItem';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const MovieRow = ({ title, url }) => {
    const rowId = Math.floor(Math.random() * 1000);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setMovies(res.data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError('Failed to fetch movies');
                setLoading(false);
            });
    }, [url]);

    const slide = (offset) => {
        const slider = document.getElementById('slider' + rowId);
        slider.scrollLeft = slider.scrollLeft + offset;
    };

    return (
        <>
            <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>{title}</h2>

            <div className='realtive flex items-center group'>
                <MdChevronLeft
                    onClick={() => slide(-500)}
                    className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
                    size={40}
                />
                <div
                    id={`slider` + rowId}
                    className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
                >
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        movies.map((movie) => (
                            <MovieItem key={movie.id} movie={movie} />
                        ))
                    )}
                </div>
                <MdChevronRight
                    onClick={() => slide(500)}
                    className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
                    size={40}
                />
            </div>
        </>
    );
};

export default MovieRow;
