import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
    <app-header></app-header>
    <div class="container body-content">
        <router-outlet></router-outlet>
        <hr />
        <app-footer></app-footer>
    </div>
`,
})
export class AppComponent {
}