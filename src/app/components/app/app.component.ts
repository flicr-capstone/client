import { Component, OnDestroy } from "@angular/core";
import { WsPayloadType } from "../../models/ws-message";
import { WebSocketService } from "../../services/web-socket.service";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnDestroy {
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
