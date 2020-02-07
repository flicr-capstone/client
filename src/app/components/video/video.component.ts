import { Component, OnInit } from "@angular/core";
import adapter from "webrtc-adapter";
import Janus from "../../lib/janus";

@Component({
	selector: "app-video",
	templateUrl: "./video.component.html",
	styleUrls: ["./video.component.scss"],
})
export class VideoComponent implements OnInit {
	janus: Janus;
	pluginHandle: any;

	constructor() {
		this.onJanusInit = this.onJanusInit.bind(this);
		this.attach = this.attach.bind(this);
		this.onMessage = this.onMessage.bind(this);
		this.didAttach = this.didAttach.bind(this);
		this.onRemoteStream = this.onRemoteStream.bind(this);
	}

	ngOnInit(): void {}

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
			server: "http://joe.local:8088/janus",
			success: this.attach,
			error(cause) {
				console.error("Error", cause);
			},
			destroyed() {
				// I should get rid of this
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
			consentDialog(on) {
				console.log("consent dialog", on);
				// e.g., Darken the screen if on=true (getUserMedia incoming), restore it otherwise
			},
			onlocalstream(stream) {
				// We have a local stream (getUserMedia worked!) to display
			},
			oncleanup() {
				// PeerConnection with the plugin closed, clean the UI
				// The plugin handle is still valid so we can create a new one
			},
			detached() {
				// Connection with the plugin closed, get rid of its features
				// The plugin handle is not valid anymore
			},
		});
	}

	didAttach(pluginHandle) {
		pluginHandle.send({ message: { request: "watch", id: 1 } });
		this.pluginHandle = pluginHandle;
		console.log(this.pluginHandle);
	}

	onMessage(msg, jsep) {
		console.log(msg, jsep);
		// Handle msg, if needed, and check jsep
		if (jsep !== undefined && jsep !== null) {
			// We have an OFFER from the plugin
			this.pluginHandle.createAnswer({
				// We attach the remote OFFER
				jsep,
				// We want recvonly audio/video
				media: { audioSend: false, videoSend: false, data: true },
				success: ourjsep => {
					// Got our SDP! Send our ANSWER to the plugin
					console.log("jsep", ourjsep);
					const body = { request: "start" };
					this.pluginHandle.send({
						message: body,
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
		console.log("onRemoteStream", stream);
		console.log("tracks", stream.getTracks());
		const element = document.querySelector("video");
		element.srcObject = stream;
	}
}
