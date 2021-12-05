import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { ReadingComponent } from './pages/reading/reading.component'
const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: ':chapter/:languaje/:page', component:ReadingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
