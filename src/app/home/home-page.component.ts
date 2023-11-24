import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TWeatherCode } from 'src/utils/types';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  loading = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToWeatherPage(code: TWeatherCode): void {
    this.router.navigate(['weather', code]);
  }

}
