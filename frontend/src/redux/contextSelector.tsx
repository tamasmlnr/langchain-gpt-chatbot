import type { RootState } from "../store";

export const selectContextIsSet = (state: RootState) => state.context.isSet;
