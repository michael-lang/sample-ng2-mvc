import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';
import { AppFooterComponent } from './app-footer.component';
import { AppRouterMenuService } from './app-router-menu.service';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [RouterModule, AppHeaderComponent, AppFooterComponent],
    providers: [AppRouterMenuService],
    declarations: [AppHeaderComponent, AppFooterComponent]
})
export class AppChromeModule {
}
