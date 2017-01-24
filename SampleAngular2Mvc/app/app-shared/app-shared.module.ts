import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabSetComponent } from './tabset/tabset.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [RouterModule, TabSetComponent],
    providers: [],
    declarations: [TabSetComponent]
})
export class AppSharedModule {
}
