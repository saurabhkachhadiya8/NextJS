"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type User = {
    username: string,
    email: string,
    password: string,
    confirmPass: string
}

const SignupPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        username: '',
        email: '',
        password: '',
        confirmPass: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            // const response = await axios.post('/api/auth/signup', user);
            // console.log('handleSignup ---> ', response.data);
            const response = await toast.promise(
                axios.post('/api/auth/signup', user),
                {
                    loading: 'Signing up...',
                    success: (res: any) => {
                        // console.log('handleSignup toastRes ---> ', res.data);
                        if (res.data.success) {
                            setUser({ username: '', email: '', password: '', confirmPass: '' });
                            return res.data.message;
                        } else {
                            throw new Error(res.data.message);
                        }
                    },
                    error: (err) => {
                        console.error('Error in signup toast ---> ', err);
                        return err.message;
                    },
                }
            );
            if (response.data.success) {
                router.push('/login');
            }
            return response.data;
        } catch (error) {
            console.log('Error in handleSignup ----> ', error);
            return false;
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='signup flex flex-col items-center justify-center min-h-screen'>
            <div className='lg:w-[25%] md:w-[50%] w-[95%] border p-5 rounded-lg text-sm bg-[#1c2029]'>
                <h1 className='text-2xl'>Signup User</h1>
                <form onSubmit={handleSignup} method='POST' className="signup-form mt-5">
                    <label htmlFor="username" className='block mt-4 mb-2'>UserName :</label>
                    <input className='border rounded-sm bg-white text-black outline-0 p-2 w-full' type="text" placeholder='Enter your name' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />

                    <label htmlFor="Email" className='block mt-4 mb-2'>Email :</label>
                    <input className='border rounded-sm bg-white text-black outline-0 p-2 w-full' type="email" placeholder='Enter your email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

                    <label htmlFor="Password" className='block mt-4 mb-2'>Password :</label>
                    <input className='border rounded-sm bg-white text-black outline-0 p-2 w-full' type="password" placeholder='Enter your password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

                    <label htmlFor="ConfirmPassword" className='block mt-4 mb-2'>Confirm Password :</label>
                    <input className='border rounded-sm bg-white text-black outline-0 p-2 w-full' type="password" placeholder='Confirm your password' value={user.confirmPass} onChange={(e) => setUser({ ...user, confirmPass: e.target.value })} />

                    <p className='mt-4'>I already have an account <Link href={'/login'} className='text-blue-500'>Login</Link></p>

                    <button className='border-sky-500 rounded-sm bg-sky-500 outline-0 p-2 w-full mt-4 cursor-pointer'>{loading ? "Siging up..." : "Signup"}</button>
                </form>
            </div>
        </section>
    )
}

export default SignupPage
