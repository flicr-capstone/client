import { Component, Input, OnInit } from "@angular/core";
import adapter from "webrtc-adapter";
import Janus from "../../lib/janus";
import { PluginHandle } from "../../models/plugin-handle";

@Component({
	selector: "app-video",
	templateUrl: "./video.component.html",
	styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit {
	janus: Janus;
	pluginHandle: PluginHandle;

	@Input()
	streamId: number;

	constructor() {
		this.onJanusInit = this.onJanusInit.bind(this);
		this.attach = this.attach.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.didAttach = this.didAttach.bind(this);
		this.onRemoteStream = this.onRemoteStream.bind(this);
	}

	ngOnInit(): void {
		console.log("streamId", this.streamId);
		this.startJanus();
	}

	startJanus() {
		Janus.init({
			debug: "all",
			dependencies: Janus.useDefaultDependencies({ adapter }),
			callback: this.onJanusInit,
		});
	}

	onJanusInit() {
		console.log("janus initialized");
		this.janus = new Janus({
			server: "https://joe.local/janus",
			success: this.attach,
			error(cause) {
				console.error("Error", cause);
			},
		});
	}

	attach() {
		this.janus.attach({
			plugin: "janus.plugin.streaming",
			opaqueId: `streamingtest-${Janus.randomString(12)}`,
			error(cause) {
				console.log("error", cause);
			},
			success: this.didAttach,
			onmessage: this.onMessage,
			onremotestream: this.onRemoteStream,
		});
	}

	didAttach(pluginHandle) {
		pluginHandle.send({ message: { request: "watch", id: this.streamId } });
		this.pluginHandle = pluginHandle;
		console.log(this.pluginHandle);
	}

	onMessage(msg, jsep) {
		if (jsep !== undefined && jsep !== null) {
			this.pluginHandle.createAnswer({
				jsep,
				media: { audioSend: false, videoSend: false, data: true },
				success: ourjsep => {
					this.pluginHandle.send({
						message: { request: "start" },
						jsep: ourjsep,
					});
				},
				error(error) {
					console.log("error", error);
				},
			});
		}
	}

	onRemoteStream(stream) {
		const element: HTMLVideoElement = document.querySelector(
			`#remotevideo${this.streamId}`
		);
		element.srcObject = stream;
	}
}
