
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";
import { Product } from '@/types';
import ProductTable from '@/components/Admin/ProductTable';
import ProductForm from '@/components/Admin/ProductForm';
import ProductDialog from '@/components/Admin/ProductDialog';
import DeleteProductDialog from '@/components/Admin/DeleteProductDialog';
import AdminSignUp from '@/components/Admin/AdminSignUp';

export default function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAdminSignUpOpen, setIsAdminSignUpOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setCurrentProduct(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (imageUrl: string) => {
    setCurrentProduct(prev => ({
      ...prev,
      image: imageUrl
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentProduct(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const validateProduct = () => {
    // Validate required fields
    if (!currentProduct.name || !currentProduct.subtitle || !currentProduct.full_description || 
        currentProduct.price === undefined || !currentProduct.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleAddProduct = async () => {
    if (!validateProduct()) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .insert([{
          name: currentProduct.name || '',
          subtitle: currentProduct.subtitle || '',
          full_description: currentProduct.full_description || '',
          price: currentProduct.price || 0,
          category: currentProduct.category || '',
          image: currentProduct.image || '/placeholder.svg',
          featured: Boolean(currentProduct.featured)
        }])
        .select();

      if (error) throw error;

      toast({
        title: "Product Added",
        description: `${currentProduct.name} has been added to your inventory.`
      });
      
      fetchProducts();
      setIsAddDialogOpen(false);
      setCurrentProduct({});
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product.",
        variant: "destructive"
      });
    }
  };

  const handleEditProduct = async () => {
    if (!validateProduct()) return;

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: currentProduct.name,
          subtitle: currentProduct.subtitle,
          full_description: currentProduct.full_description,
          price: currentProduct.price,
          category: currentProduct.category,
          image: currentProduct.image,
          featured: currentProduct.featured
        })
        .eq('id', currentProduct.id);

      if (error) throw error;

      toast({
        title: "Product Updated",
        description: `${currentProduct.name} has been updated.`
      });
      
      fetchProducts();
      setIsEditDialogOpen(false);
      setCurrentProduct({});
    } catch (error) {
      console.error('Error updating product:', error);
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', currentProduct.id);

      if (error) throw error;

      toast({
        title: "Product Deleted",
        description: `${currentProduct.name} has been removed from your inventory.`
      });
      
      fetchProducts();
      setIsDeleteDialogOpen(false);
      setCurrentProduct({});
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive"
      });
    }
  };

  const openAddDialog = () => {
    setCurrentProduct({
      featured: false,
      image: '/placeholder.svg'
    });
    setIsAddDialogOpen(true);
  };

  const openEditDialog = (product: Product) => {
    setCurrentProduct({ ...product });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (product: Product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const toggleAdminSignUp = () => {
    setIsAdminSignUpOpen(!isAdminSignUpOpen);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={toggleAdminSignUp}>
            {isAdminSignUpOpen ? "Hide Admin Creation" : "Create Admin Account"}
          </Button>
          <Button onClick={openAddDialog}>
            <Plus className="h-4 w-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      {/* Admin Sign Up Form */}
      {isAdminSignUpOpen && (
        <div className="mb-6">
          <AdminSignUp />
        </div>
      )}

      {/* Products Table */}
      <ProductTable 
        products={products}
        loading={loading}
        onEdit={openEditDialog}
        onDelete={openDeleteDialog}
      />

      {/* Add Product Dialog */}
      <ProductDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        title="Add New Product"
      >
        <ProductForm 
          product={currentProduct}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onImageChange={handleImageChange}
          onSubmit={handleAddProduct}
          onCancel={() => setIsAddDialogOpen(false)}
          submitLabel="Save Product"
          title="Add New Product"
        />
      </ProductDialog>

      {/* Edit Product Dialog */}
      <ProductDialog 
        open={isEditDialogOpen} 
        onOpenChange={setIsEditDialogOpen}
        title="Edit Product"
      >
        <ProductForm 
          product={currentProduct}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onImageChange={handleImageChange}
          onSubmit={handleEditProduct}
          onCancel={() => setIsEditDialogOpen(false)}
          submitLabel="Update Product"
          title="Edit Product"
        />
      </ProductDialog>

      {/* Delete Product Dialog */}
      <DeleteProductDialog 
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        product={currentProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}
