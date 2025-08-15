import { useState, useCallback, useRef } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

import { LucideIcon } from 'src/components/lucide-icons';

// ----------------------------------------------------------------------

const CATEGORIES = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Desserts',
  'Beverages',
  'Appetizers',
  'Main Course',
  'Side Dishes',
  'Salads',
];

export interface FoodFormData {
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  preparationTime: string;
}

interface FoodFormProps {
  initialData?: Partial<FoodFormData>;
  onSubmit: (data: FoodFormData) => void;
  isLoading?: boolean;
  submitButtonText?: string;
}

export function FoodForm({ 
  initialData = {}, 
  onSubmit, 
  isLoading = false,
  submitButtonText = 'Save'
}: FoodFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FoodFormData>({
    name: initialData.name || '',
    description: initialData.description || '',
    price: initialData.price || '',
    category: initialData.category || '',
    image: initialData.image || '',
    preparationTime: initialData.preparationTime || '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(initialData.image || null);

  const handleInputChange = (field: keyof FoodFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (field: keyof FoodFormData) => (event: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData(prev => ({
          ...prev,
          image: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = useCallback(() => {
    onSubmit(formData);
  }, [formData, onSubmit]);

  return (
    <Card sx={{
      p: 3,
      border: '1px solid #E0E0E0',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      backgroundColor: '#FFFFFF'
    }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Food Information
      </Typography>

             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
         {/* Image Upload Section */}
         <Box sx={{ display: 'flex', justifyContent: 'center' }}>
           <Paper
             elevation={0}
             sx={{
               position: 'relative',
               width: 200,
               height: 200,
               borderRadius: 2,
               border: '2px dashed #E0E0E0',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               cursor: 'pointer',
               transition: 'all 0.3s ease',
               overflow: 'hidden',
               '&:hover': {
                 borderColor: 'primary.main',
                 backgroundColor: 'grey.50',
               },
             }}
             onClick={handleImageClick}
           >
             {imagePreview ? (
               <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                 <Avatar
                   src={imagePreview}
                   alt="Food preview"
                   sx={{
                     width: '100%',
                     height: '100%',
                     borderRadius: 1,
                   }}
                 />
                 <IconButton
                   sx={{
                     position: 'absolute',
                     top: 8,
                     right: 8,
                     backgroundColor: 'rgba(0, 0, 0, 0.5)',
                     color: 'white',
                     '&:hover': {
                       backgroundColor: 'rgba(0, 0, 0, 0.7)',
                     },
                   }}
                   onClick={(e) => {
                     e.stopPropagation();
                     setImagePreview(null);
                     setFormData(prev => ({ ...prev, image: '' }));
                   }}
                 >
                   <LucideIcon icon="eva:close-fill" />
                 </IconButton>
               </Box>
             ) : (
               <Box sx={{ textAlign: 'center', p: 2 }}>
                 <LucideIcon 
                   icon="eva:camera-fill" 
                   sx={{ 
                     fontSize: 48, 
                     color: 'grey.400',
                     mb: 1 
                   }} 
                 />
                 <Typography variant="body2" color="text.secondary">
                   Click to upload image
                 </Typography>
                 <Typography variant="caption" color="text.secondary">
                   JPG, PNG up to 5MB
                 </Typography>
               </Box>
             )}
           </Paper>
         </Box>

         <input
           ref={fileInputRef}
           type="file"
           accept="image/*"
           onChange={handleImageChange}
           style={{ display: 'none' }}
         />

         <Box sx={{ display: 'flex', gap: 2 }}>
           <TextField
             fullWidth
             name="name"
             label="Food Name"
             value={formData.name}
             onChange={handleInputChange('name')}
             slotProps={{
               inputLabel: { shrink: true },
             }}
           />
           <FormControl fullWidth>
             <InputLabel>Category</InputLabel>
             <Select
               value={formData.category}
               label="Category"
               onChange={handleSelectChange('category')}
             >
               {CATEGORIES.map((category) => (
                 <MenuItem key={category} value={category.toLowerCase()}>
                   {category}
                 </MenuItem>
               ))}
             </Select>
           </FormControl>
         </Box>

         <Box sx={{ display: 'flex', gap: 2 }}>
           <TextField
             fullWidth
             name="price"
             label="Price"
             type="number"
             value={formData.price}
             onChange={handleInputChange('price')}
             slotProps={{
               inputLabel: { shrink: true },
             }}
             inputProps={{
               min: 0,
               step: 0.01,
             }}
           />
           <TextField
             fullWidth
             name="preparationTime"
             label="Preparation Time (minutes)"
             type="number"
             value={formData.preparationTime}
             onChange={handleInputChange('preparationTime')}
             slotProps={{
               inputLabel: { shrink: true },
             }}
             inputProps={{
               min: 0,
               step: 1,
             }}
           />
         </Box>

         <TextField
           fullWidth
           name="description"
           label="Description"
           multiline
           rows={4}
           value={formData.description}
           onChange={handleInputChange('description')}
           slotProps={{
             inputLabel: { shrink: true },
           }}
         />

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : submitButtonText}
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
