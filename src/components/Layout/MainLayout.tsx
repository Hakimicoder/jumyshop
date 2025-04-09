
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '@/lib/utils';
import Header from './Header';
import Footer from './Footer';
import { useToast } from '@/hooks/use-toast';

interface MainLayoutProps {
  requireAuth?: boolean;
  children?: React.ReactNode;
}

const MainLayout = ({ requireAuth = false, children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (requireAuth && !isAuthenticated()) {
      toast({
        title: "Authentication Required",
        description: "Please log in to access this page.",
        variant: "destructive"
      });
      navigate('/login');
    }
  }, [requireAuth, navigate, toast]);

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
