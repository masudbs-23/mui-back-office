import type { PopoverProps } from '@mui/material/Popover';

import { useState, forwardRef, useCallback } from 'react';

import Box from '@mui/material/Box';
import Popover from '@mui/material/Popover';

// ----------------------------------------------------------------------

type Props = PopoverProps & {
  arrow?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left-top' | 'left-bottom' | 'right-top' | 'right-bottom';
  disabledArrow?: boolean;
};

export const CustomPopover = forwardRef<HTMLDivElement, Props>(
  ({ children, arrow = 'top-right', disabledArrow, sx, ...other }, ref) => {
    const arrowSize = 12;

    const arrowStyle = {
      top: {
        left: 0,
        right: 0,
        height: arrowSize,
      },
      bottom: {
        left: 0,
        right: 0,
        height: arrowSize,
      },
      left: {
        top: 0,
        bottom: 0,
        width: arrowSize,
      },
      right: {
        top: 0,
        bottom: 0,
        width: arrowSize,
      },
    };

    const arrowPositionStyle = {
      'top-left': {
        top: -arrowSize,
        left: 20,
      },
      'top-right': {
        top: -arrowSize,
        right: 20,
      },
      'bottom-left': {
        bottom: -arrowSize,
        left: 20,
      },
      'bottom-right': {
        bottom: -arrowSize,
        right: 20,
      },
      'left-top': {
        left: -arrowSize,
        top: 20,
      },
      'left-bottom': {
        left: -arrowSize,
        bottom: 20,
      },
      'right-top': {
        right: -arrowSize,
        top: 20,
      },
      'right-bottom': {
        right: -arrowSize,
        bottom: 20,
      },
    };

    const [arrowDirection, arrowPosition] = arrow.split('-') as [keyof typeof arrowStyle, keyof typeof arrowPositionStyle];
    
    // Get arrow position styles with fallback to prevent undefined access
    const positionStyles = arrowPositionStyle[arrowPosition] || arrowPositionStyle['top-right'];

    return (
      <Popover
        ref={ref}
        sx={{
          '& .MuiPopover-paper': {
            boxShadow: (theme) => theme.customShadows.dropdown,
            borderRadius: 2,
            ...sx,
          },
        }}
        {...other}
      >
        {!disabledArrow && (
          <Box
            sx={{
              top: positionStyles.top,
              left: positionStyles.left,
              right: positionStyles.right,
              bottom: positionStyles.bottom,
              width: arrowStyle[arrowDirection]?.width,
              height: arrowStyle[arrowDirection]?.height,
              position: 'absolute',
              transform: 'rotate(45deg)',
              bgcolor: 'background.paper',
              borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
              borderRight: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          />
        )}

        {children}
      </Popover>
    );
  }
);

// ----------------------------------------------------------------------

export function usePopover() {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  }, []);

  const onClose = useCallback(() => {
    setOpen(null);
  }, []);

  return {
    open: !!open,
    anchorEl: open,
    onOpen,
    onClose,
  };
}
