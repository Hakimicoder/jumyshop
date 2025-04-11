
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';

interface ProductFormProps {
  product: Partial<Product>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCheckboxChange: (checked: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
  submitLabel: string;
  title: string;
}

export default function ProductForm({
  product,
  onInputChange,
  onCheckboxChange,
  onSubmit,
  onCancel,
  submitLabel,
  title
}: ProductFormProps) {
  return (
    <div>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name*
          </Label>
          <Input
            id="name"
            name="name"
            value={product.name || ''}
            onChange={onInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="subtitle" className="text-right">
            Subtitle*
          </Label>
          <Input
            id="subtitle"
            name="subtitle"
            value={product.subtitle || ''}
            onChange={onInputChange}
            className="col-span-3"
            placeholder="Brief description - shown on cards"
          />
        </div>
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="full_description" className="text-right">
            Full Description*
          </Label>
          <Textarea
            id="full_description"
            name="full_description"
            value={product.full_description || ''}
            onChange={onInputChange}
            className="col-span-3"
            placeholder="Detailed description - visible on product page"
            rows={4}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="category" className="text-right">
            Category*
          </Label>
          <Input
            id="category"
            name="category"
            value={product.category || ''}
            onChange={onInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="price" className="text-right">
            Price*
          </Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={product.price || ''}
            onChange={onInputChange}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="image" className="text-right">
            Image URL
          </Label>
          <Input
            id="image"
            name="image"
            value={product.image || ''}
            onChange={onInputChange}
            className="col-span-3"
            placeholder="/placeholder.svg"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <div className="text-right">
            <Label htmlFor="featured">Featured</Label>
          </div>
          <div className="flex items-center space-x-2 col-span-3">
            <Checkbox
              id="featured"
              checked={Boolean(product.featured)}
              onCheckedChange={onCheckboxChange}
            />
            <label
              htmlFor="featured"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Display as featured product
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>{submitLabel}</Button>
      </div>
    </div>
  );
}
