import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { HelloComponent } from "./hello.component";

describe("HelloComponent", () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [HelloComponent],
		}).compileComponents();
	}));

	it("should create the app", () => {
		const fixture = TestBed.createComponent(HelloComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'client'`, () => {
		const fixture = TestBed.createComponent(HelloComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual("client");
	});

	it("should render title in a h1 tag", () => {
		const fixture = TestBed.createComponent(HelloComponent);
		fixture.detectChanges();
		const compiled = fixture.debugElement.nativeElement;
		expect(compiled.querySelector("h1").textContent).toContain(
			"Welcome to client!"
		);
	});
});
