import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabSetComponent } from './tabset/tabset.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgxDatatableModule
    ],
    exports: [
        RouterModule,
        TabSetComponent,
        NgxDatatableModule
    ],
    providers: [],
    declarations: [TabSetComponent]
})
export class AppSharedModule {
}
