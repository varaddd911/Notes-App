import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';

export default function Login() {
    const { login } = useAuth();
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState(null);

    const handleSuccess = async (credentialResponse) => {
        setIsLoggingIn(true);
        setError(null);
        try {
            console.log('Received Google credential, attempting login...'); // Debug log
            const success = await login(credentialResponse.credential);
            if (!success) {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Failed to login. Please try again.');
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleError = () => {
        console.error('Google Login Failed');
        setError('Failed to initialize Google login. Please try again.');
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
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/20 rounded-md text-center">
                            {error}
                        </div>
                    )}
                    <div className="grid gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="w-full flex justify-center">
                                <GoogleLogin
                                    onSuccess={handleSuccess}
                                    onError={handleError}
                                    useOneTap={false}
                                    theme="filled_black"
                                    shape="pill"
                                    size="large"
                                    disabled={isLoggingIn}
                                    type="standard"
                                    login_uri={window.location.origin}
                                />
                            </div>
                            {isLoggingIn && (
                                <div className="text-center text-sm text-muted-foreground">
                                    Signing in...
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-sm uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Secure Authentication
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
