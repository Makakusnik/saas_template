import { Action } from '../constants/casl.constants';
import { AddRule } from '../types/authorization.types';
import { User } from '@authentication/config/better-auth.config';

export function defineUserPolicies(user: User, can: AddRule, cannot: AddRule) {
  if (user.role === 'user') {
    can(Action.Create, 'all');
    cannot(Action.ReadAll, 'all');
    can(Action.Read, 'all', ({ userId }) => userId === user.id);
    can(Action.Update, 'all', ({ userId }) => userId === user.id);
    can(Action.Delete, 'all', ({ userId }) => userId === user.id);
  }
}
