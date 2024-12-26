import { TScopeUserData } from "../types";

export const transformToScopeUser = <T>(
  input: T,
  transformer: (item: T) => TScopeUserData,
): TScopeUserData => {
  return transformer(input);
};
