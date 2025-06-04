import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AbilityProvider } from '@authorization/authorization.provider';
import { CheckPolicies } from '@authorization/decorators/check-policies.decorator';
import { Action } from '@authorization/constants/casl.constants';
import { AppAbility } from '@authorization/types/authorization.types';

@Controller('user')
export class UserController {
  private ability: AppAbility | null;

  constructor(
    private readonly userService: UserService,
    private readonly abilityProvider: AbilityProvider,
  ) {
    this.ability = this.abilityProvider.getAbility();
  }

  @Post()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, 'user'))
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @CheckPolicies((ability: AppAbility) => ability.can(Action.ReadAll, 'user'))
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Read, 'user'))
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Update, 'user'))
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Delete, 'user'))
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
