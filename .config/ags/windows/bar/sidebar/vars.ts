import { Variable } from 'astal';

export const sideBarShown = new Variable<"home" | "appLauncher" | null>(null);
export const showContentWindow = new Variable<boolean>(false);
