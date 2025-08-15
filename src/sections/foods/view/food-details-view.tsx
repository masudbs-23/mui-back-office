import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';

import { useRouter } from 'src/routes/hooks';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumb } from 'src/components/breadcrumb';
import { LucideIcon } from 'src/components/lucide-icons';
import { Label, labelClasses } from 'src/components/label';
import { useFood } from 'src/hooks/useApi';

// ----------------------------------------------------------------------

export function FoodDetailsView() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  
  const { data: food, isLoading, error } = useFood(id!);

  if (isLoading) {
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

  return (
    <DashboardContent>
      <Breadcrumb
        title="Food Details"
        items={[
          { title: 'Dashboard', href: '/dashboard' },
          { title: 'Foods List', href: '/dashboard/foods' },
          { title: food.name }
        ]}
      />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3, mb: 2 }}>
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

        <Button
          variant="contained"
          size="large"
          onClick={() => router.push(`/dashboard/foods/${food._id}/edit`)}
          startIcon={<LucideIcon icon="solar:pen-bold" />}
        >
          Edit Food
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Food Image */}
        <Card sx={{
          p: 3,
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#FFFFFF',
          width: 300,
          height: 'fit-content'
        }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Food Image
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              src={food.image}
              alt={food.name}
              sx={{
                width: 200,
                height: 200,
                borderRadius: 2,
              }}
            />
          </Box>
        </Card>

        {/* Food Information */}
        <Card sx={{
          flex: 1,
          p: 3,
          border: '1px solid #E0E0E0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          backgroundColor: '#FFFFFF'
        }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Food Information
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ mb: 1 }}>
                {food.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {food.description}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label={`$${food.price}`}
                color="primary"
                variant="outlined"
                sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}
              />
              <Label
                variant="soft"
                color={
                  (food.category === 'breakfast' && 'info') ||
                  (food.category === 'lunch' && 'warning') ||
                  (food.category === 'dinner' && 'error') ||
                  'default'
                }
                sx={{
                  [`& .${labelClasses.root}`]: {
                    textTransform: 'capitalize',
                    fontSize: '1rem',
                  },
                }}
              >
                {food.category}
              </Label>
              <Chip
                label={`${food.preparationTime} min`}
                color="secondary"
                variant="outlined"
              />
              <Label
                variant="soft"
                color={food.available ? 'success' : 'error'}
                sx={{
                  [`& .${labelClasses.root}`]: {
                    textTransform: 'capitalize',
                    fontSize: '1rem',
                  },
                }}
              >
                {food.available ? 'Available' : 'Unavailable'}
              </Label>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Preparation Time
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {food.preparationTime} minutes
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Created
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {new Date(food.createdAt).toLocaleDateString()}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Last Updated
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {new Date(food.updatedAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
