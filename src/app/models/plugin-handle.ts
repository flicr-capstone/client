export interface PluginHandle {
	createAnswer: (options: {
		jsep: any;
		media: any;
		success: any;
		error: any;
	}) => void;
	send: (options: { jsep: any; message: any }) => void;
}
