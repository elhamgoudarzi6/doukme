import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header-shop',
  templateUrl: './header-shop.component.html',
  styleUrls: ['./header-shop.component.scss']
})
export class HeaderShopComponent implements OnInit {
  displayBasket: boolean = false;
  items: MenuItem[] | any;
  activeItem: MenuItem | any;
  scrollableItems: MenuItem[] | any;
  constructor(private router: Router,) { }

  ngOnInit(): void {
    this.items = [
      { label: 'فروشگاه', icon: 'pi pi-home' },
      { label: 'محصولات', icon: 'pi pi-list' },
      { label: 'فروشنده شو', icon: 'pi pi-users' },
    ];
    this.scrollableItems = Array.from({ length: 50 }, (_, i) => ({ label: `Tab ${i + 1}`, icon: `pi pi-fw pi-display` }));
    this.activeItem = this.scrollableItems[0];
  }
  activateMenu(event: any) {
    if (event.activeItem.label === 'فروشگاه') {
      this.router.navigateByUrl('/shop');
    }
    if (event.activeItem.label === 'محصولات') {
      this.router.navigateByUrl('/shop/products');
    }
    if (event.activeItem.label === 'فروشنده شو') {
      this.router.navigateByUrl('/seller-intro');
    }
  }
  showBasket() {
    this.displayBasket = !this.displayBasket;
  }

}
