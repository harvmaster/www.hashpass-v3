import { AuthEvents, AuthEventTypes, UserEvents, UserEventTypes } from "./Managers/UserManager/types";

export type EventTypes = AuthEventTypes | UserEventTypes;
export type Message = AuthEvents | UserEvents;
