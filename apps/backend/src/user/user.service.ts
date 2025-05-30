import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto';
import { Action } from '@authorization/constants/casl.constants';
import { subject } from '@casl/ability';
import { AppAbility } from '@authorization/types/authorization.types';
import { CheckPolicies } from '@authorization/decorators/check-policies.decorator';
import { AbilityProvider } from '@authorization/authorization.provider';
import { NOT_ALLOWED_OPERATION_EXCEPTION } from 'constants/exceptions';

@Injectable()
export class UserService {
  private ability: AppAbility;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly abilityProvider: AbilityProvider,
  ) {
    this.ability = this.abilityProvider.getAbility();
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'user'))
  create(createUserDto: CreateUserDto) {
    if (!this.ability.can(Action.Create, subject('user', createUserDto))) {
      throw new UnauthorizedException(NOT_ALLOWED_OPERATION_EXCEPTION);
    }

    return this.userRepository.create(createUserDto);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAll, 'user'))
  async findAll() {
    return await this.userRepository.findAll();
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'user'))
  async findOne(id: string) {
    const result = await this.userRepository.findOne(id);

    if (!this.ability.can(Action.Read, subject('user', result))) {
      throw new UnauthorizedException(NOT_ALLOWED_OPERATION_EXCEPTION);
    }

    return result;
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'user'))
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);

    if (!this.ability.can(Action.Update, subject('user', user))) {
      throw new UnauthorizedException(NOT_ALLOWED_OPERATION_EXCEPTION);
    }

    return await this.userRepository.update(id, updateUserDto);
  }

  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'user'))
  async remove(id: string) {
    const result = await this.userRepository.findOne(id);

    if (!this.ability.can(Action.Delete, subject('user', result))) {
      throw new UnauthorizedException(NOT_ALLOWED_OPERATION_EXCEPTION);
    }

    return this.userRepository.delete(id);
  }
}
