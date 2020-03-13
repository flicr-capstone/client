import { Component, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { handleKeyEvent } from "../../lib/key-events";
import { WebSocketService } from "../../services/web-socket.service";

@Component({
	selector: "app-debug-window",
	templateUrl: "./debug-window.component.html",
	styleUrls: ["./debug-window.component.scss"],
})
export class DebugWindowComponent implements OnInit, OnDestroy {
	constructor(private ws: WebSocketService) {}

	ngOnInit() {
		this.ws.open();
		this.ws.subscribe(() => {});
		const keyDowns: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
			document,
			"keydown"
		);
		const keyUps: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(
			document,
			"keyup"
		);

		merge(keyDowns, keyUps)
			.pipe(filter(event => !event.repeat))
			.subscribe(msg => handleKeyEvent(this.ws, msg));
	}

	ngOnDestroy() {
		this.ws.close();
	}
}
