import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AppAbility } from '@authorization/types/authorization.types';
import { AbilityProvider } from '@authorization/authorization.provider';

@Injectable()
export class UserService {
  private ability: AppAbility | null;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly abilityProvider: AbilityProvider,
  ) {
    this.ability = this.abilityProvider.getAbility();
  }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string) {
    return await this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.findOne(id);
  }
}
