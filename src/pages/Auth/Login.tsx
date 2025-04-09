
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getUsers, setUser, getUser } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Vérifie si l'utilisateur connecté est un admin
  useEffect(() => {
    const currentUser = getUser();
    if (currentUser && currentUser.role === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network request
    setTimeout(() => {
      const users = getUsers();
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setUser(user);
        toast({
          title: 'Login Successful',
          description: `Welcome back, ${user.username}!`,
        });
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/products');
        }
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid username or password.',
          variant: 'destructive',
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-3xl font-bold tracking-tight">
            Login to your account
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary font-medium">
              Register
            </Link>
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>

          {/* N'affiche les boutons de démo que si l'utilisateur est un administrateur */}
          {isAdmin && (
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-muted-foreground">
                    Or login with demo credentials
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setUsername('user');
                    setPassword('user123');
                  }}
                >
                  User Demo
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setUsername('adminjumael');
                    setPassword('admin2005');
                  }}
                >
                  Admin Demo
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
