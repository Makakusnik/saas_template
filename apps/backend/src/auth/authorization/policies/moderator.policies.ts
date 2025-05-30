import { Action } from '../constants/casl.constants';
import { AddRule } from '../types/authorization.types';
import { User } from '@authentication/config/better-auth.config';

export function defineModeratorPolicies(user: User, can: AddRule, cannot: AddRule) {
  if (user.role === 'moderator') {
    can(Action.Create, 'all');
    can(Action.Read, 'all');
    can(Action.Update, 'all');
    can(Action.Delete, 'all');
  }
}
