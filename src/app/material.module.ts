import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule, MatRadioModule, MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports: [MatMenuModule, MatSidenavModule, MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule,
    FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule],

  exports: [MatMenuModule, MatSidenavModule, MatNativeDateModule, FormsModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule,
    MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatListModule, MatRadioModule]
})

  export  class  MaterialModule { }
