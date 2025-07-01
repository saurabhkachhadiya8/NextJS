"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
            router.push('/dashboard');
        } catch (error) {
            console.log('Error in handleLogin ----> ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='login flex flex-col items-center justify-center min-h-screen'>
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className='text-4xl'>Login to your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <span>Don't have an account? <Link href={"/signup"} className='underline'>Create an account here</Link></span>
                    <form onSubmit={handleLogin}>
                        <div className="grid gap-2 my-4">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                required
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        <div className="grid gap-2 my-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                required
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center justify-between my-4">
                            <div className="flex items-center gap-3">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember">Remember me</Label>
                            </div>
                            <Link
                                href="/login"
                                className="text-sm underline-offset-4 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        {!loading ? (
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        ) : (
                            <Button className="w-full" disabled>
                                <Loader2Icon className="animate-spin" />
                                Please wait
                            </Button>
                        )}
                    </form>
                </CardContent>
                <div className="relative my-2 px-6">
                    <Separator />
                    <span className="absolute left-[50%] -top-3 -translate-x-[50%] text-md font-medium text-foreground bg-white px-4">
                        or
                    </span>
                </div>
                <CardFooter className="flex-col gap-2">
                    <Button variant="outline" className="w-full">
                        Login with Google
                    </Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default LoginPage
