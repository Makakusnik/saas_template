import { Action } from '../constants/casl.constants';
import { AddRule } from '../types/authorization.types';

export function definePublicPolicies(can: AddRule, cannot: AddRule) {
  cannot(Action.Manage, 'all');
  // ** WARNING **
  // Be very careful with allowing public access to **ANY** resource.
}
