import { AbilityBuilder, ConditionsMatcher, FieldMatcher, MatchConditions, PureAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Action } from './constants/casl.constants';
import { defineUserPolicies } from './policies/user.policies';
import { defineModeratorPolicies } from './policies/moderator.policies';
import { AppAbility } from './types/authorization.types';
import { User } from '@authentication/config/better-auth.config';
import { definePublicPolicies } from './policies/public.policies';

const fieldMatcher: FieldMatcher = (fields) => (field) => fields.includes(field);

const lambdaMatcher = (matchConditions: MatchConditions) => matchConditions;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user?: User) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(PureAbility);

    if (!user) {
      definePublicPolicies(can, cannot);

      return build({
        conditionsMatcher: lambdaMatcher as any as ConditionsMatcher<unknown>,
        fieldMatcher: fieldMatcher,
      });
    }

    if (user.role === 'admin') {
      can(Action.Manage, 'all');
    }

    defineUserPolicies(user, can, cannot);
    defineModeratorPolicies(user, can, cannot);

    return build({
      conditionsMatcher: lambdaMatcher as any as ConditionsMatcher<unknown>,
      fieldMatcher: fieldMatcher,
    });
  }
}
