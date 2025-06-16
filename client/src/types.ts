export interface Note {
    _id: string;
    name: string;
    description: string;
    type: 'Personal' | 'Work';
    date: string;
    user: string;
}

export interface User {
    _id: string;
    googleId: string;
    email: string;
    name: string;
    picture?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (googleToken: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}
