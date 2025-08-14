import { LucideIcon } from 'src/components/lucide-icons';

import type { AccountPopoverProps } from './components/account-popover';

// ----------------------------------------------------------------------

export const _account: AccountPopoverProps['data'] = [
  {
    label: 'Profile',
    href: '/profile',
    icon: <LucideIcon width={22} icon="solar:user-bold-duotone" />,
  },
  {
    label: 'Change Password',
    href: '/change-password',
    icon: <LucideIcon width={22} icon="solar:lock-password-bold-duotone" />,
  },
];
