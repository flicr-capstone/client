import { Component, OnInit } from "@angular/core";
import { fromEvent, merge, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { handleKeyEvent } from "../../lib/key-events";

@Component({
	selector: "app-debug-window",
	templateUrl: "./debug-window.component.html",
	styleUrls: ["./debug-window.component.scss"],
})
export class DebugWindowComponent implements OnInit {
	constructor() {}

	ngOnInit() {
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
			.subscribe(handleKeyEvent);
	}
}
