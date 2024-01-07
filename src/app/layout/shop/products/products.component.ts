import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { LayoutService } from './../../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MegaMenuItem, MenuItem } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [MessageService]
})
export class ProductsComponent implements OnInit {
  public displayBasket: boolean = false;
  itemsCatPc: MegaMenuItem[] | any;
  items: MenuItem[] | any;
  items2: MenuItem[] | any;
  itemsMobile: MenuItem[] = [];
  itemsPc: MegaMenuItem[] = [];
  cats: any[] = [];
  products: any[] = [];
  sellers: any[] = [];
  sellerID: any;
  filteredSellerNames: any[] = [];
  filteredSellerShopNames: any[] = [];
  filteredProductNames: any[] = [];
  filteredProductOffers: any[] = [];
  sortOptions: any[] = [];
  filterOptions: any[] = [];
  total: number = 0;
  sortValue = 1;
  filterValue = 1;
  sortID = 1;
  offer = false;
  public displayMobileFilter: boolean = false;
  rangeValues: number[] = [10000, 20000000];
  valueDynamic = 500000;
  highValueDynamic = 50000000;
  data: any = { updatedAt: -1 };
  subListPC: MenuItem[] | undefined;
  constructor(private service: LayoutService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,) {

    this.sortOptions = [
      { icon: 'pi pi-history', name: 'جدیدترین', value: 1 },
      { icon: 'pi pi-sort-amount-down', name: 'گران ترین', value: 2 },
      { icon: 'pi pi-sort-amount-up', name: 'ارزان ترین', value: 3 },
    ];
    this.filterOptions = [
      { icon: 'pi pi-search', name: 'جستجو', value: 1 },
    ];
  }

  advanceSearchProduct(data: any): any {
    this.service.advanceSearchProduct(data).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.products = response.data;
        this.total = this.products.length;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }
  goToDetail(id: any): void {
    this.router.navigate(['/shop/product/' + id]);
  }
  goProduct(catId: any, subCatId: any, subSubCatID: any): any {
    this.router.navigateByUrl('/products/' + catId + '/' + subCatId + '/' + subSubCatID);
  }

  ngOnInit(): void {
    // this.getAllProductCat();
    this.route.paramMap.subscribe((params) => (this.data.sellerID = params.get('sellerID')));
    this.getAllSeller();
    this.advanceSearchProduct(this.data);

    this.service.getAllProductCat().subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.cats = response.data;
        let subList: MenuItem[];
        let subSubList: MenuItem[];
        this.cats.forEach((cat) => {
          subList = [];
          if (cat.ProductSubCat.length > 0) {
            cat.ProductSubCat.forEach((sub: { ProductSubSubCat: { title: any; _id: any; }[]; _id: any; title: any; }) => {
              subSubList = [];
              if (sub.ProductSubSubCat.length > 0) {
                sub.ProductSubSubCat.forEach((subSub: { title: any; _id: any; }) => {
                  subSubList.push({
                    label: subSub.title,
                    command: (event) =>
                      this.goProduct(cat._id, sub._id, subSub._id),
                  });
                });
              }
              subList.push({
                label: sub.title,
                items: subSubList,
              });
            });
            this.itemsMobile.push({
              label: cat.title,
              items: subList,
            });
          } else {
            this.itemsMobile.push({
              label: cat.title,
              command: (event: any) => this.goProduct(cat._id, 0, 0),
            });
          }
        });
      }
    });

    this.items2 = [
      {
        label: 'محصولات',
        icon: 'pi pi-fw pi-list',
        items: this.itemsMobile,
      },
    ];
    console.log(this.items2)
  }


  onChangeSortOptions(e: any) {
    this.sortValue = e.value;
    if (this.sortValue == 1) {
      delete this.data.price;
      this.data.updatedAt = -1;
      this.advanceSearchProduct(this.data);
    }
    if (this.sortValue == 2) {
      this.data.price = -1;
      this.advanceSearchProduct(this.data);
    }
    if (this.sortValue == 3) {
      this.data.price = 1;
      this.advanceSearchProduct(this.data);
    }
  }
  onRemoveKey(e: any) {
    // this.keywords.pop();
  }
  onAddKey(e: any) {
    this.data.keywords = e.value.toLowerCase();
    this.advanceSearchProduct(this.data);
  }

  filterSellerShopName(event: any) {
    this.filteredSellerShopNames = this.sellers.filter((item: any) => item.shopName.toLowerCase().includes(event.query.toLowerCase()));
  }
  onSellerShopNameChange(e: any) {
    delete this.data.productID;
    this.data.sellerID = e._id;
    this.advanceSearchProduct(this.data);
  }
  filterSellerName(event: any) {
    this.filteredSellerNames = this.sellers.filter((item: any) => item.fullName.toLowerCase().includes(event.query.toLowerCase()));
  }
  onSellerNameChange(e: any) {
    delete this.data.productID;
    this.data.sellerID = e._id;
    this.advanceSearchProduct(this.data);
  }
  filterProductName(event: any) {
    this.filteredProductNames = this.products.filter((item: any) => item.title.toLowerCase().includes(event.query.toLowerCase()));
  }
  onProductNameChange(e: any) {
    if (e._id !== undefined) {
      this.router.navigate(['/shop/product/' + e._id]);
    }
  }
  onOfferChange(event: any) {
    if (event.checked === true) {
      this.data.offer = true;
      this.advanceSearchProduct(this.data);
    }
    if (event.checked === false) {
      delete this.data.offer;
      this.advanceSearchProduct(this.data);
    }
  }
  getAllSeller(): any {
    this.service.getAllSeller().subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.sellers = response.data;
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' دریافت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }
  // getAllProductCat(): any {
  //   this.service.getAllProductCat().subscribe((response: { success: boolean; data: any; }) => {
  //     if (response.success === true) {
  //       this.cats = response.data;
  //     } else {
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: ' دریافت اطلاعات ',
  //         detail: response.data,
  //       });
  //     }
  //   });
  // }

  addToCart() {
    this.messageService.add({
      severity: 'success',
      summary: 'تایید',
      detail: "به سبد خرید اضافه شد",
    });
  }

  showBasket() {
    this.displayBasket = !this.displayBasket;
  }

}



