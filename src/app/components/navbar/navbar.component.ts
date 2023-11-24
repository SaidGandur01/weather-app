import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TItems, TWeatherCode } from 'src/utils/types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  currentSelection: TItems = ''

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onItemSelected(selection: TItems, code: TWeatherCode): void {
    this.currentSelection = selection;
    this.router.navigate(['weather', code]);
  }

  goToHomePage(): void {
    this.router.navigate(['home']);
  }

}
