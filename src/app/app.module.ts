import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DebugWindowComponent } from "./components/debug-window/debug-window.component";
import { VideoComponent } from "./components/video/video.component";

@NgModule({
	declarations: [AppComponent, VideoComponent, DebugWindowComponent],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
