import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_ROUTE, ROLES_KEY } from './constants';
import { UserRole } from 'src/shared/enums/userRole.enum';

export const PublicRoute = () => SetMetadata(IS_PUBLIC_ROUTE, true);
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
