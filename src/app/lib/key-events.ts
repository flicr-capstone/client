import { WsPayloadType } from "../models/ws-message";
import { WebSocketService } from "../services/web-socket.service";

export function handleKeyEvent(
	webSocketService: WebSocketService,
	event: KeyboardEvent
) {
	const { code, type } = event;
	console.log({ code, type });
	webSocketService.send(WsPayloadType.KEY_EVENT, { code, type });
}
