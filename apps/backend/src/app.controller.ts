import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AbilityProvider } from '@authorization/authorization.provider';
import { Public } from '@authentication/decorators/public.decorator';
import { Optional } from '@authentication/decorators/optional.decorator';
import { Action } from '@authorization/constants/casl.constants';
import { AppAbility } from '@authorization/types/authorization.types';

@Controller()
export class AppController {
  // Ability can be null in case of public route.
  private ability: AppAbility; // EXAMPLE - Remove this line if not needed

  constructor(
    private readonly appService: AppService,
    private readonly abilityProvider: AbilityProvider, // EXAMPLE - Remove this line if not needed
  ) {
    this.ability = this.abilityProvider.getAbility(); // EXAMPLE - Remove this line if not needed
  }

  // EXAMPLE - Remove this route if not needed
  @Get()
  getExampleProtected(): string {
    return 'This is a protected route example - you should not see this if you are not authenticated.';
  }

  // EXAMPLE - Remove this route if not needed
  @Get('public')
  @Public()
  getExamplePublic(): string {
    return 'This is a public route example.';
  }

  // EXAMPLE - Remove this route if not needed - User read permission is needed!
  @Get('optional')
  @Optional()
  getExampleOptional(): string {
    if (this.ability && this.ability.can(Action.Read, 'user')) {
      return 'This is an optional route example with permitted user.';
    }

    return 'This is an optional route example without (permitted) user.';
  }
}
