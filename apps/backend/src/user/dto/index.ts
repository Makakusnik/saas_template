import { createUserSchema, updateUserSchema } from '@TODO_add_package_name/contracts';
import { createZodDto } from 'nestjs-zod';

export class CreateUserDto extends createZodDto(createUserSchema) {}
export class UpdateUserDto extends createZodDto(updateUserSchema) {}
