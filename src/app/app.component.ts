import { Component } from '@angular/core';
import { InjectionToken } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//  const darkTheme = {
//   name: 'dark',
//   properties: {
//     '--background': '#1F2125',
//     '--on-background': '#fff',
//     '--primary': 'darkorange',
//     '--on-primary': '#fff',
//   }
// } 
//  const lightTheme = {
//   name: 'light',
//   properties: {
//     '--background': '#f6f7f9',
//     '--on-background': '#000',
//     '--primary': '#1976d2',
//     '--on-primary': '#000'
//   }
// };

//  const THEMES = new InjectionToken('THEMES');
//  const ACTIVE_THEME = new InjectionToken('ACTIVE_THEME');

export class AppComponent {
  title = 'appmanager';
  toggle() {
   // const active = this.themeService.getActiveTheme() ;
    // if (active.name === 'light') {
    //   this.themeService.setTheme('dark');
    // } else {
    //   this.themeService.setTheme('light');
    // }
  }
}
