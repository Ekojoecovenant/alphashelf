import { Role } from '../enums/role.enum';

export interface AuthUser {
  id: string;
  role: Role;
}
