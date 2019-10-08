import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./components/app/app.component";
import { DebugPageComponent } from "./components/debug-page/debug-page.component";
import { DebugWindowComponent } from "./components/debug-window/debug-window.component";
import { HelloComponent } from "./components/hello/hello.component";
import { VideoComponent } from "./components/video/video.component";

@NgModule({
	declarations: [
		HelloComponent,
		AppComponent,
		VideoComponent,
		DebugWindowComponent,
		DebugPageComponent,
	],
	imports: [BrowserModule, AppRoutingModule, FormsModule, FontAwesomeModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
