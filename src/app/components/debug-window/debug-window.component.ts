import { Component, OnInit } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { merge } from "rxjs";
import {
	distinctUntilChanged,
	filter,
	groupBy,
	map,
	mergeAll,
} from "rxjs/operators";
import { handleKeyDown, handleKeyUp } from "../../lib/key-events";

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

		const keyPresses = merge(keyDowns, keyUps)
			.pipe(filter(event => !event.repeat))
			.subscribe(e => {
				console.log(e);
			});
	}
}
