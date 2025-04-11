
import ProductDialog from './ProductDialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface DeleteProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Partial<Product>;
  onDelete: () => void;
}

export default function DeleteProductDialog({ 
  open, 
  onOpenChange, 
  product, 
  onDelete 
}: DeleteProductDialogProps) {
  return (
    <ProductDialog 
      open={open} 
      onOpenChange={onOpenChange} 
      title="Delete Product"
      footer={
        <>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </>
      }
    >
      <p>Are you sure you want to delete "{product.name}"?</p>
      <p className="text-sm text-muted-foreground">
        This action cannot be undone.
      </p>
    </ProductDialog>
  );
}
