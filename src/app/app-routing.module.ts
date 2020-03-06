import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from "./components/app/app.component";
import { DebugPageComponent } from "./components/debug-page/debug-page.component";
import { HelloComponent } from "./components/hello/hello.component";

const routes: Routes = [
	{
		path: "hello",
		component: HelloComponent,
	},
	{
		path: "debug",
		component: DebugPageComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
