import { Component, OnInit } from '@angular/core';
import { LayoutService } from './../layout.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.scss']
})
export class MarketingComponent implements OnInit {
  packages: any[] = [];
  responsiveOptions: any[] = [];
  cv: any[] = [];
  constructor(private service: LayoutService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.getPackages();
    this.getAllCvpack();
  }

  getPackages() {
    this.service.getAllPackage().subscribe((response: { success: boolean; data: any[]; }) => {
      if (response.success === true) {
        this.packages = response.data;
      }
    });
  }

  getAllCvpack() {
    this.service.getAllCvpack().subscribe((response: { success: boolean; data: any[]; }) => {
      if (response.success === true) {
        this.cv = response.data;
      }
    });
  }
}
