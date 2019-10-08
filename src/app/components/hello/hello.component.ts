import { Component, OnDestroy } from "@angular/core";
import { WsPayloadType } from "../../models/ws-message";
import { WebSocketService } from "../../services/web-socket.service";

@Component({
	selector: "app-hello",
	templateUrl: "./hello.component.html",
	styleUrls: ["./hello.component.scss"],
})
export class HelloComponent implements OnDestroy {
	name: string;
	message: string;

	constructor(private ws: WebSocketService) {}

	ngOnDestroy() {
		this.close();
	}

	open(): void {
		this.ws.open();
		this.ws.subscribe(({ msg: { greeting } }) => (this.message = greeting));
	}

	send(): void {
		this.ws.send(WsPayloadType.GREET, { name: this.name });
	}

	close(): void {
		this.ws.close();
	}
}
