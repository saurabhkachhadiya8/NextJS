"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { Loader2Icon } from 'lucide-react';
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
            const toastId: string = "signupToast";
            toast.loading('Signing you up...', { id: toastId });
            // const response = await axios.post('/api/auth/signup', user);
            // console.log('handleSignup ---> ', response.data);
            const response = await axios.post('/api/auth/signup', user);
            if (!response.data.success) {
                return toast.error(response.data.message || "Fail to Signup", { id: toastId });
            }
            toast.success(response.data.message || "User created successfully", { id: toastId });
            setUser({ username: '', email: '', password: '', confirmPass: '' });
            router.push('/login');
        } catch (error) {
            console.log('Error in handleSignup ----> ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className='signup flex flex-col items-center justify-center min-h-screen'>
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className='text-4xl'>Create your account</CardTitle>
                </CardHeader>
                <CardContent>
                    <span>Already have an account? <Link href={"/login"} className='underline'>Login here</Link></span>
                    <form onSubmit={handleSignup}>
                        <div className="grid gap-2 my-4">
                            <Label htmlFor="uaername">UaerName</Label>
                            <Input
                                type="text"
                                required
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </div>
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
                        <div className="grid gap-2 my-4">
                            <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                            <Input
                                type="password"
                                required
                                value={user.confirmPass}
                                onChange={(e) => setUser({ ...user, confirmPass: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-3 my-4">
                            <Checkbox id="remember" />
                            <Label htmlFor="remember">I agree to <Link href={"#"} className='underline-offset-4 hover:underline'>terms and conditions</Link></Label>
                        </div>
                        {!loading ? (
                            <Button type="submit" className="w-full">
                                Signup
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
                        Signup with Google
                    </Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default SignupPage
