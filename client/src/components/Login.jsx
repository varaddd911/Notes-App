import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';

export default function Login() {
    const { login } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSuccess = async (credentialResponse) => {
        setIsLoggingIn(true);
        try {
            const success = await login(credentialResponse.credential);
            if (!success) {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleError = () => {
        console.error('Login Failed');
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="fixed top-4 right-4">
                <ModeToggle />
            </div>
            <Card className="w-[450px]">
                <CardHeader className="space-y-2">
                    <CardTitle className="text-3xl font-bold text-center">Welcome to Notes App</CardTitle>
                    <CardDescription className="text-lg text-center">Click below to sign in with Google</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    useOneTap
                                    theme="filled_black"
                                    shape="pill"
                                    size="large"
                                    disabled={isLoggingIn}
                                />
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-sm uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    {isLoggingIn ? 'Signing in...' : 'Secure Authentication'}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-base text-muted-foreground text-center">
                    <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
                </CardFooter>
            </Card>
        </div>
    );
}
