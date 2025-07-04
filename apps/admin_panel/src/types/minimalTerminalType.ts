import type { TerminalType } from '~/graphql/graphql';

export type MinimalTerminal = Pick<
  TerminalType,
  'domain' | 'fee_group' | 'id' | 'owner_id' | 'permissions' | 'reconcile_type' | 'status'
>;
