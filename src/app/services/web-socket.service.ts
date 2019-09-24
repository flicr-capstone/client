import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";
import { WebSocketSubject } from "rxjs/internal-compatibility";
import { webSocket } from "rxjs/webSocket";
import { environment } from "../../environments/environment";
import { WsMessage, WsPayload, WsPayloadType } from "../models/ws-message";

@Injectable({
	providedIn: "root",
})
export class WebSocketService {
	constructor() {}

	webSocket$: WebSocketSubject<any>;

	open(): void {
		const { webSocketUrl } = environment;
		this.webSocket$ = webSocket(webSocketUrl);
	}

	subscribe(subscriptionHook): Subscription {
		return this.webSocket$.subscribe(subscriptionHook);
	}

	send(type: WsPayloadType, msg: WsMessage): void {
		const payload: WsPayload = { type, msg };
		this.webSocket$.next(payload);
	}

	close(): void {
		this.webSocket$.complete();
	}
}
