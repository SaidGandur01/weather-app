import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/home-page.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';

const routes: Routes = [
  { path: "home", component: HomePageComponent },
  { path: 'weather/:id', component: WeatherPageComponent },
  { path: '', redirectTo: "home", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
