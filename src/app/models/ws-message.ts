export enum WsPayloadType {
	GREET = "GREET",
	KEY_EVENT = "KEY_EVENT",
}

export interface WsGreeting {
	name?: string;
	greeting?: string;
}

export interface WsKeyEvent {
	code: string;
	type: string;
}

export type WsMessage = WsGreeting | WsKeyEvent;

export interface WsPayload {
	type: WsPayloadType;
	msg: WsMessage | any;
}
