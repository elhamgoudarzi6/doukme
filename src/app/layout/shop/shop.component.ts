import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem, MessageService } from 'primeng/api';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { LayoutService } from './../layout.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    providers: [MessageService]
})
export class ShopComponent implements OnInit {
    items: MenuItem[] | any;
    responsiveOptions: any[] = [];
    selectedSellerName: any;
    selectedSellerShopName: any;
    products: any[] = [];
    sellers: any[] = [];
    slider: any[] = [];
    cats: any[] = [];
    subCats: any[] = [];
    employees: any[] = [];
    filteredSellerNames: any[] = [];
    filteredSellerShopNames: any[] = [];
    filteredProductNames: any[] = [];

    customOptions: OwlOptions = {
        autoplay: true,
        autoplaySpeed: 1000,
        autoplayTimeout: 5000,
        loop: true,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
        dots: false,
        navSpeed: 700,
        nav: true,
        navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
        responsive: {
            0: {
                items: 1
            },
            400: {
                items: 1
            },
            740: {
                items: 1
            },
            940: {
                items: 1
            }
        }
    };

    constructor(private service: LayoutService,
        private messageService: MessageService,
        private router: Router,) {
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

    filterSellerShopName(event: any) {
        this.filteredSellerShopNames = this.sellers.filter((item: any) => item.shopName.includes(event.query));
    }
    onSellerShopNameChange(e: any) {
        if (e._id !== undefined) {
        this.selectedSellerShopName = e._id;
        this.router.navigate(['/shop/products/' + this.selectedSellerShopName]);
        }
    }
    filterSellerName(event: any) {
        this.filteredSellerNames = this.sellers.filter((item: any) => item.fullName.includes(event.query));
    }
    onSellerNameChange(e: any) {
        if (e._id !== undefined) {
        this.selectedSellerName = e._id;
        this.router.navigate(['/shop/products/' + this.selectedSellerName]);
        }
    }
    filterProductName(event: any) {
        this.filteredProductNames = this.products.filter((item: any) => item.title.toLowerCase().includes(event.query.toLowerCase()));
    }
    onProductNameChange(e: any) {
        if (e._id !== undefined) {
            this.router.navigate(['/shop/product/' + e._id]);
        }
    }

    getAllProductCat(): any {
        this.service.getAllProductCat().subscribe((response: { success: boolean; data: any; }) => {
            if (response.success === true) {
                this.cats = response.data;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: ' دریافت اطلاعات ',
                    detail: response.data,
                });
            }
        });
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

    getAllNewProduct(): any {
        this.service.getAllNewProduct().subscribe((response: { success: boolean; data: any; }) => {
            if (response.success === true) {
                this.products = response.data;
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: ' دریافت اطلاعات ',
                    detail: response.data,
                });
            }
        });
    }

    ngOnInit(): void {
        this.getAllProductCat();
        this.getAllNewProduct();
        this.getAllSeller();
        this.slider = [{ image: "../../../assets/images/slide.jpg" }, { image: "../../../assets/images/slide2.jpg" }];
        this.items = [
            {
                label: 'File',
                icon: 'pi pi-pw pi-file',
                items: [{
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        { label: 'User', icon: 'pi pi-fw pi-user-plus' },
                        { label: 'Filter', icon: 'pi pi-fw pi-filter' }
                    ]
                },
                { label: 'Open', icon: 'pi pi-fw pi-external-link' },
                { separator: true },
                { label: 'Quit', icon: 'pi pi-fw pi-times' }
                ]
            },
            {
                label: 'Edit',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Delete', icon: 'pi pi-fw pi-trash' },
                    { label: 'Refresh', icon: 'pi pi-fw pi-refresh' }
                ]
            },
            {
                label: 'Help',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Contents',
                        icon: 'pi pi-pi pi-bars'
                    },
                    {
                        label: 'Search',
                        icon: 'pi pi-pi pi-search',
                        items: [
                            {
                                label: 'Text',
                                items: [
                                    {
                                        label: 'Workspace'
                                    }
                                ]
                            },
                            {
                                label: 'User',
                                icon: 'pi pi-fw pi-file',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Actions',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Edit',
                        icon: 'pi pi-fw pi-pencil',
                        items: [
                            { label: 'Save', icon: 'pi pi-fw pi-save' },
                            { label: 'Update', icon: 'pi pi-fw pi-save' },
                        ]
                    },
                    {
                        label: 'Other',
                        icon: 'pi pi-fw pi-tags',
                        items: [
                            { label: 'Delete', icon: 'pi pi-fw pi-minus' }
                        ]
                    }
                ]
            }
        ];


    }

}
