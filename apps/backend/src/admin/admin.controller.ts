import { Controller, Get, Param, UseGuards, SetMetadata } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { ApiTags } from '@nestjs/swagger';

enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

@ApiTags('Admin')
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Roles(Role.ADMIN)
  @Get('users')
  findUsers() {
    return this.adminService.findUsers();
  }

  @Roles(Role.ADMIN)
  @Get('users/:id')
  findUser(@Param('id') id: string) {
    return this.adminService.findUserById(id);
  }
}
