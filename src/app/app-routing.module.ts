import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DebugPageComponent } from "./components/debug-page/debug-page.component";
import { HelloComponent } from "./components/hello/hello.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
	{
		path: "hello",
		component: HelloComponent,
	},
	{
		path: "debug",
		component: DebugPageComponent,
	},
	{
		path: "",
		component: HomeComponent,
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
