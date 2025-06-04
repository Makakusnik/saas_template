import { Injectable, NotImplementedException } from '@nestjs/common';
import { Kysely } from 'kysely';
import { DatabaseService } from '@db/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserRepository {
  private db: Kysely<any>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDB();
  }

  async create(createUserDto: CreateUserDto) {
    throw new NotImplementedException("Method 'create' is not implemented yet in UserRepository.");
  }

  async findAll() {
    throw new NotImplementedException("Method 'findAll' is not implemented yet in UserRepository.");
  }

  async findOne(id: string) {
    throw new NotImplementedException("Method 'findOne' is not implemented yet in UserRepository.");
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    throw new NotImplementedException("Method 'update' is not implemented yet in UserRepository.");
  }

  async delete(id: string) {
    throw new NotImplementedException("Method 'delete' is not implemented yet in UserRepository.");
  }
}
