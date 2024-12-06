'use client';

import { useEffect, useState } from 'react';

import { supabase } from '@/lib/supabase';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Add this effect to sync auth state
    useEffect(() => {
        // Check current auth status
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsLoggedIn(!!session);
        });

        // Listen for auth changes
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsLoggedIn(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignUp = async () => {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) {
            alert(`Sign-up error: ${error.message}`);
        } else {
            alert('Sign-up successful! Check your email to confirm your account.');
        }
    };

    const handleSignIn = async () => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            alert(`Sign-in error: ${error.message}`);
        } else {
            setIsLoggedIn(true);
        }
    };

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            alert(`Sign-out error: ${error.message}`);
        } else {
            setIsLoggedIn(false);
        }
    };

    return (
        <div className='auth-container'>
            {!isLoggedIn ? (
                <>
                    <input
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input'
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='input'
                    />
                    <button onClick={handleSignUp} className='btn'>
                        Sign Up
                    </button>
                    <button onClick={handleSignIn} className='btn'>
                        Sign In
                    </button>
                </>
            ) : (
                <button onClick={handleSignOut} className='btn'>
                    Sign Out
                </button>
            )}
        </div>
    );
}
