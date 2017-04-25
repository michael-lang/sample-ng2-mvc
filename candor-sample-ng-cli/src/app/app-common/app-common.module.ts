import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { //only import the portions you will use to optimize build (MaterialModule to include all is deprecated)
    MdAutocompleteModule,
    MdCoreModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdTabsModule,
    MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
      CommonModule,
      MdAutocompleteModule,
      MdCoreModule,
      MdButtonModule,
      MdButtonToggleModule,
      MdCardModule,
      MdCheckboxModule,
      MdIconModule,
      MdInputModule,
      MdListModule,
      MdMenuModule,
      MdProgressSpinnerModule,
      MdRadioModule,
      MdRippleModule,
      MdSelectModule,
      MdSidenavModule,
      MdSlideToggleModule,
      MdSnackBarModule,
      MdToolbarModule,
      MdTabsModule,
      FlexLayoutModule
  ],
  declarations: [],
  exports: [
      MdAutocompleteModule,
      MdCoreModule,
      MdButtonModule,
      MdButtonToggleModule,
      MdCardModule,
      MdCheckboxModule,
      MdIconModule,
      MdInputModule,
      MdListModule,
      MdMenuModule,
      MdProgressSpinnerModule,
      MdRadioModule,
      MdRippleModule,
      MdSelectModule,
      MdSidenavModule,
      MdSlideToggleModule,
      MdSnackBarModule,
      MdToolbarModule,
      MdTabsModule,
      FlexLayoutModule
  ]
})
export class AppCommonModule { }
