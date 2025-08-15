import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { useSnackbar } from 'src/components/snackbar';
import { Breadcrumb } from 'src/components/breadcrumb';
import { LucideIcon } from 'src/components/lucide-icons';
import { FoodForm, type FoodFormData } from '../components/food-form';
import { useFood, useUpdateFood } from 'src/hooks/useApi';

// ----------------------------------------------------------------------

export function EditFoodView() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { showSnackbar } = useSnackbar();
  
  const { data: food, isLoading: isLoadingFood, error } = useFood(id!);
  const updateFoodMutation = useUpdateFood();

  const handleSubmit = useCallback((formData: FoodFormData) => {
    if (!id) return;

    // Basic validation
    if (!formData.name || !formData.category || !formData.price || !formData.preparationTime) {
      showSnackbar('Please fill in all required fields', 'error');
      return;
    }

    // Validate price is a valid number
    if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      showSnackbar('Please enter a valid price', 'error');
      return;
    }

    // Validate preparation time
    if (isNaN(Number(formData.preparationTime)) || Number(formData.preparationTime) <= 0) {
      showSnackbar('Please enter a valid preparation time', 'error');
      return;
    }

    const foodData = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      image: formData.image,
      preparationTime: Number(formData.preparationTime),
    };

    updateFoodMutation.mutate(
      { id, foodData },
      {
        onSuccess: () => {
          showSnackbar('Food updated successfully!', 'success');
          router.push('/dashboard/foods');
        },
        onError: () => {
          showSnackbar('Failed to update food. Please try again.', 'error');
        },
      }
    );
  }, [id, updateFoodMutation, router, showSnackbar]);

  if (isLoadingFood) {
    return (
      <DashboardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  if (error || !food) {
    return (
      <DashboardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 400 }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" color="error" sx={{ mb: 2 }}>
              Food not found
            </Typography>
            <Button
              variant="outlined"
              onClick={() => router.push('/dashboard/foods')}
            >
              Back to Foods
            </Button>
          </Box>
        </Box>
      </DashboardContent>
    );
  }

  const initialData = {
    name: food.name,
    description: food.description || '',
    price: food.price.toString(),
    category: food.category || '',
    image: food.image || '',
    preparationTime: food.preparationTime.toString(),
  };

  return (
    <DashboardContent>
      <Breadcrumb
        title="Edit Food"
        items={[
          { title: 'Dashboard', href: '/dashboard' },
          { title: 'Foods List', href: '/dashboard/foods' },
          { title: 'Edit Food' }
        ]}
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3, mb: 2 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => router.push('/dashboard/foods')}
          startIcon={<LucideIcon icon="eva:arrow-back-fill" />}
          sx={{
            borderColor: 'grey.400',
            color: 'grey.700',
            '&:hover': {
              borderColor: 'grey.600',
              backgroundColor: 'grey.50',
            },
          }}
        >
          Back
        </Button>
      </Box>

      <FoodForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={updateFoodMutation.isPending}
        submitButtonText="Update Food"
      />
    </DashboardContent>
  );
}
