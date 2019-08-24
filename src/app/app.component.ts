import { Component } from "@angular/core";

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "client";
	url = "ws://localhost:8080";
	websocket: WebSocket;
	message = "Hey";

	constructor() {
		this.onClose = this.onClose.bind(this);
		this.onError = this.onError.bind(this);
		this.onClose = this.onMessage.bind(this);
		this.onOpen = this.onOpen.bind(this);
	}

	hello(): void {
		this.websocket.send(this.title);
	}

	open(): void {
		this.websocket = new WebSocket(this.url);
		this.websocket.onclose = this.onClose;
		this.websocket.onerror = this.onError;
		this.websocket.onmessage = this.onMessage;
		this.websocket.onopen = this.onOpen;
	}

	onClose(event): void {
		console.log("On close");
	}

	onError(event): void {
		console.log("On error", event);
	}

	onMessage(event): void {
		console.log("On message", event);
		this.message = event.data;
		console.log(event.data);
		console.log(this.message);
	}
	onOpen(): void {
		console.log("On open");
	}
}
