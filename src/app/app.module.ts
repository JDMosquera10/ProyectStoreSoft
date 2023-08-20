import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreComponent } from './models/store/store.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule } from '@angular/common/http'
import { MatSortModule } from '@angular/material/sort';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DialogStoreComponent } from './models/store/diallog-store/dialog-store.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogPermissComponent } from './models/dialog-permiss/dialog-permiss.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
@NgModule({
  declarations: [
    AppComponent,
    StoreComponent,
    DialogStoreComponent,
    DialogPermissComponent
  ],
  imports: [
    HttpClientModule,
    MatTableModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    MatListModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    DatePipe,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  exports: [AppComponent, StoreComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
