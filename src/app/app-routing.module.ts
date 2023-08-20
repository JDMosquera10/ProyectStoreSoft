import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './models/store/store.component';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "store" },
  {
    path: "store",
    component: StoreComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
