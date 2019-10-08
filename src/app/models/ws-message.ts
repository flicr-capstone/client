export enum WsPayloadType {
	GREET = "GREET",
}

export interface WsGreeting {
	name?: string;
	greeting?: string;
}

export type WsMessage = WsGreeting;

export interface WsPayload {
	type: WsPayloadType;
	msg: WsMessage | any;
}
