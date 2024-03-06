import React, { useEffect, useState } from 'react';
import { MdChevronRight, MdChevronLeft } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';
import { UserAuth } from "../context/AuthContext";
import { db } from "../services/firebase";
import { createImageUrl } from "../services/movieServices";
import { arrayRemove, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Profile = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = UserAuth();

    useEffect(() => {
        if (user) {
            const unsubscribe = onSnapshot(doc(db, 'users', `${user.email}`), (doc) => {
                if (doc.exists()) {
                    setMovies(doc.data().favShows);
                } else {
                    setMovies([]);
                }
            });

            return () => unsubscribe();
        }
    }, [user?.email]);

    const slide = (offset) => {
        const slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + offset;
    }

    const handleUnlikeShow = async (movie) => {
        setLoading(true);
        setError('');

        try {
            const userDoc = doc(db, 'users', user.email);
            await updateDoc(userDoc, {
                favShows: arrayRemove(movie)
            });
        } catch (err) {
            setError('Error removing show from favorites');
            console.error('Unlike show error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {error && <div className="text-red-500">{error}</div>}
            <div>
                <div>
                    <img
                        className='block w-full h-[500px] object-cover'
                        src="https://assets.nflxext.com/ffe/siteui/vlv3/2e07bc25-8b8f-4531-8e1f-7e5e33938793/e4b3c14a-684b-4fc4-b14f-2b486a4e9f4e/IN-en-20240219-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
                        alt="//"
                    />
                    <div className='bg-black/60 fixed top-0 left-0 w-full h-[500px]' />
                    <div className='absolute top-[20%] p-4 md:p-8'>
                        <h1 className='text-3xl md:text-5xl font-nsans-bold my-2'>
                            My Fav Shows
                        </h1>
                        <p className='font-nsans-light text-gray-400 text-lg'>
                            {user.email}
                        </p>
                    </div>
                </div>
                <h2 className='font-nsans-bold md:text-xl p-4 capitalize'>Fav Shows</h2>
                <div className='realtive flex items-center group'>
                    <MdChevronLeft
                        onClick={() => slide(-500)}
                        className='bg-white rounded-full absolute left-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
                        size={40}
                    />
                    <div
                        id={`slider`}
                        className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide'
                    >
                        {movies.map((movie) => (
                            <div
                                key={movie.id}
                                className='relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block
                            rounded-lg overflow-hidden cursor-pointer m-2'>
                                <img
                                    className='w-full h-40 block object-cover object-top'
                                    src={createImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")}
                                    alt={movie.title}
                                />
                                <div className='absolute top-0 left-0 w-full h-40 bg-black/80 opacity-0 hover:opacity-100'>
                                    <p className='whitespace-normal text-xs md:text-sm flex justify-center items-center h-full font-nsans-bold'>
                                        {movie.title}
                                    </p>
                                    <p>
                                        <AiOutlineClose
                                            size={30}
                                            onClick={() => handleUnlikeShow(movie)}
                                            className='absolute top-2 right-2'
                                        />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <MdChevronRight
                        onClick={() => slide(500)}
                        className='bg-white rounded-full absolute right-2 opacity-80 text-gray-700 z-10 hidden group-hover:block cursor-pointer'
                        size={40}
                    />
                </div>
            </div>
        </>
    )
}

export default Profile;
