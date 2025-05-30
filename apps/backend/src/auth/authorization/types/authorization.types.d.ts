import { AbilityBuilder, InferSubjects, PureAbility } from '@casl/ability';
import { Action } from '../constants/casl.constants';
import { DB } from 'kysely-codegen';
import { Selectable } from 'kysely';

export type Subjects = InferSubjects<Selectable<DB[keyof DB]> | keyof DB> | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

export type AbilityBuilderReturn = InstanceType<typeof AbilityBuilder<AppAbility>>;

export type AddRule = AbilityBuilderReturn['can'];
