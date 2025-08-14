import type { ReactNode} from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

import { useAuth } from 'src/contexts/AuthContext';

interface AuthRedirectProps {
  children: ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isInitialCheck, setIsInitialCheck] = useState(true);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
    
    // Mark initial check as complete after first auth check
    if (!isLoading) {
      setIsInitialCheck(false);
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading spinner only during initial auth check (first load)
  if (isLoading && isInitialCheck) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // If authenticated, don't render children (will redirect)
  if (isAuthenticated) {
    return null;
  }

  // If not authenticated, render children (including during login process)
  return <>{children}</>;
}
