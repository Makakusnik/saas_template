import { Injectable, NotImplementedException } from '@nestjs/common';
import { Kysely, Selectable } from 'kysely';
import { DB } from 'kysely-codegen';
import { DatabaseService } from '@db/database.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserRepository {
  private db: Kysely<DB>;

  constructor(private readonly databaseService: DatabaseService) {
    this.db = databaseService.getDB();
  }

  async create(createUserDto: CreateUserDto): Promise<Pick<Selectable<DB['user']>, 'id'>> {
    throw new NotImplementedException("Method 'create' is not implemented yet in UserRepository.");
  }

  async findAll(): Promise<Selectable<DB['user']>[]> {
    throw new NotImplementedException("Method 'findAll' is not implemented yet in UserRepository.");
  }

  async findOne(id: string): Promise<Selectable<DB['user']> | null> {
    throw new NotImplementedException("Method 'findOne' is not implemented yet in UserRepository.");
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Pick<Selectable<DB['user']>, 'id'>> {
    throw new NotImplementedException("Method 'update' is not implemented yet in UserRepository.");
  }

  async delete(id: string): Promise<Pick<Selectable<DB['user']>, 'id'>> {
    throw new NotImplementedException("Method 'delete' is not implemented yet in UserRepository.");
  }
}
