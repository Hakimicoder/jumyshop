
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/AuthProvider';

interface MainLayoutProps {
  requireAuth?: boolean;
  children?: React.ReactNode;
}

const MainLayout = ({ requireAuth = false, children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isLoading } = useAuth();
  
  useEffect(() => {
    if (!isLoading && requireAuth && !user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [requireAuth, navigate, toast, user, isLoading]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children || <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
