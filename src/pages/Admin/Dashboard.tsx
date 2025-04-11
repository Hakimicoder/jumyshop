import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUsers, getProducts } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Package, Users, Tag, Settings } from 'lucide-react';
import { Product, User } from '@/types'; // <-- tes propres types ici

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const usersData = await getUsers(); // Ajout du await ici
        const productsData = await getProducts();

        setUsers(usersData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const featuredProducts = products.filter(product => product.featured).length;

  const statsData = [
    {
      title: 'Total Products',
      value: isLoading ? '...' : products.length,
      icon: <Package className="h-8 w-8 text-blue-500" />,
      href: '/admin/products',
    },
    {
      title: 'Featured Products',
      value: isLoading ? '...' : featuredProducts,
      icon: <Tag className="h-8 w-8 text-yellow-500" />,
      href: '/admin/products',
    },
    {
      title: 'Registered Users',
      value: isLoading ? '...' : users.length,
      icon: <Users className="h-8 w-8 text-green-500" />,
      href: '/admin/users',
    },
    {
      title: 'Settings',
      value: '-',
      icon: <Settings className="h-8 w-8 text-purple-500" />,
      href: '#',
    },
  ];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat) => (
          <Link to={stat.href} key={stat.title}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="opacity-70">{stat.icon}</div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Admin Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Add, edit, or delete products from your inventory.
              </p>
              <Link
                to="/admin/products"
                className="text-primary font-medium hover:underline"
              >
                Go to Products Manager
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Manage Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                View and manage user accounts.
              </p>
              <Link
                to="/admin/users"
                className="text-primary font-medium hover:underline"
              >
                Go to User Manager
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
