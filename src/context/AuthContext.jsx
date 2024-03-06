import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    async function signUp(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // User is successfully created, now set user document in Firestore
            await setDoc(doc(db, 'users', userCredential.user.email), {
                favShows: [],
            });
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }

    async function logIn(email, password) {
        try {
            return await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    }

    async function logOut() {
        try {
            return await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ user, signUp, logIn, logOut, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function UserAuth() {
    return useContext(AuthContext);
}
