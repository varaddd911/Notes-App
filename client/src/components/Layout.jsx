import { Outlet } from 'react-router-dom';
import NavigationBar from '../Menubar';
import { useAuth } from '../contexts/AuthContext';
import Login from './Login';

export default function Layout() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <NavigationBar />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
