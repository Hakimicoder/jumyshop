
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'admin')) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this area.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [navigate, toast, user, isLoading]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <Outlet />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
