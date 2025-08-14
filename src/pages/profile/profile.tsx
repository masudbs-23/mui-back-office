import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { _myAccount } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumb } from 'src/components/breadcrumb';
import { LucideIcon } from 'src/components/lucide-icons';

// ----------------------------------------------------------------------

export default function ProfileView() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    displayName: _myAccount.displayName,
    email: _myAccount.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies.',
    website: 'https://masudrana.dev',
    company: 'Tech Solutions Inc.',
    position: 'Senior Developer',
  });

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = useCallback(() => {
    // Handle form submission here
    console.log('Profile data:', formData);
    // You can add a success notification here
  }, [formData]);

  return (
    <DashboardContent>
      <Breadcrumb 
        title="Profile" 
        items={[
          { title: 'Dashboard', href: '/dashboard' },
          { title: 'Profile' }
        ]} 
      />

      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 3, mb: 2 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={() => router.push('/dashboard')}
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

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Card sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Profile Information
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Profile Picture Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
              <Avatar 
                src={_myAccount.photoURL} 
                alt={_myAccount.displayName}
                sx={{ width: 80, height: 80 }}
              >
                {_myAccount.displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6">{_myAccount.displayName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {_myAccount.email}
                </Typography>
              </Box>
            </Box>

                         {/* Personal Information */}
             <Box>
               <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                 Personal Information
               </Typography>
               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                 <TextField
                   fullWidth
                   name="displayName"
                   label="Full Name"
                   value={formData.displayName}
                   onChange={handleInputChange('displayName')}
                   slotProps={{
                     inputLabel: { shrink: true },
                   }}
                 />
                 <TextField
                   fullWidth
                   name="email"
                   label="Email Address"
                   type="email"
                   value={formData.email}
                   onChange={handleInputChange('email')}
                   slotProps={{
                     inputLabel: { shrink: true },
                   }}
                 />
               </Box>
               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                 <TextField
                   fullWidth
                   name="phone"
                   label="Phone Number"
                   value={formData.phone}
                   onChange={handleInputChange('phone')}
                   slotProps={{
                     inputLabel: { shrink: true },
                   }}
                 />
                 <TextField
                   fullWidth
                   name="website"
                   label="Website"
                   value={formData.website}
                   onChange={handleInputChange('website')}
                   slotProps={{
                     inputLabel: { shrink: true },
                   }}
                 />
               </Box>
               <TextField
                 fullWidth
                 name="address"
                 label="Address"
                 value={formData.address}
                 onChange={handleInputChange('address')}
                 slotProps={{
                   inputLabel: { shrink: true },
                 }}
               />
             </Box>

             {/* Professional Information */}
             <Box>
               <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                 Professional Information
               </Typography>
               <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                 <TextField
                   fullWidth
                   name="company"
                   label="Company"
                   value={formData.company}
                   onChange={handleInputChange('company')}
                   slotProps={{
                     inputLabel: { shrink: true },
                   }}
                 />
                 <TextField
                   fullWidth
                   name="position"
                   label="Position"
                   value={formData.position}
                   onChange={handleInputChange('position')}
                   slotProps={{
                     inputLabel: { shrink: true },
                   }}
                 />
               </Box>
             </Box>

             {/* Bio */}
             <Box>
               <Typography variant="subtitle1" sx={{ mb: 3, fontWeight: 'bold' }}>
                 About Me
               </Typography>
               <TextField
                 fullWidth
                 name="bio"
                 label="Bio"
                 multiline
                 rows={4}
                 value={formData.bio}
                 onChange={handleInputChange('bio')}
                 slotProps={{
                   inputLabel: { shrink: true },
                 }}
               />
             </Box>

            {/* Save Button */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
              >
                Save Changes
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </DashboardContent>
  );
}
