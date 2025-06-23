"use client"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type User = {
    email: string,
    password: string,
}

const LoginPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const toastId: string = "loginToast";
            toast.loading('Logging you in...', { id: toastId });
            const response = await axios.post('/api/auth/login', user);
            // console.log(response);
            if (!response.data.success) {
                return toast.error(response.data.message || "Fail to Login", { id: toastId });
            }
            toast.success(response.data.message || "Login Successful", { id: toastId });
            setUser({ email: '', password: '' });
            router.push('/profile');
        } catch (error) {
            console.log('Error in handleLogin ----> ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='login flex flex-col items-center justify-center min-h-screen'>
            <div className='w-[25%] border p-5 rounded-lg text-sm bg-[#1c2029]'>
                <h1 className='text-2xl'>Login User</h1>
                <form onSubmit={handleLogin} method='POST' className="login-form mt-5">
                    <label htmlFor="Email" className='block mt-4 mb-2'>Email :</label>
                    <input className='border rounded-sm bg-white text-black outline-0 p-2 w-full' type="email" placeholder='Enter your email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

                    <label htmlFor="Password" className='block mt-4 mb-2'>Password :</label>
                    <input className='border rounded-sm bg-white text-black outline-0 p-2 w-full' type="password" placeholder='Enter your password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

                    <p className='mt-4'>I don't have an account <Link href={'/signup'} className='text-blue-500'>Signup</Link></p>

                    <button className='border-sky-500 rounded-sm bg-sky-500 outline-0 p-2 w-full mt-4'>{loading ? "Loging in..." : "Login"}</button>
                </form>
            </div>
        </section>
    )
}

export default LoginPage
