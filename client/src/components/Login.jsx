import { useAuth } from '../contexts/AuthContext';
import { GoogleLogin } from '@react-oauth/google';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from './ui/card';
import { ModeToggle } from './mode-toggle';

export default function Login() {
    const { login } = useAuth();

    const handleSuccess = async (credentialResponse) => {
        await login(credentialResponse.credential);
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
                            <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                theme="filled_black"
                                shape="pill"
                                size="large"
                                width="full"
                            />
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
