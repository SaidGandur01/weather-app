import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/home-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WeatherPageComponent } from './weather-page/weather-page.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavbarComponent,
    WeatherPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      backdropBorderRadius: "4px",
      primaryColour: "#181f29",
      secondaryColour: "#181f29",
      tertiaryColour: "#181f29",
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
