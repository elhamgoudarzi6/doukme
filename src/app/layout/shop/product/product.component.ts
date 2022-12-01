import { Component, OnInit } from '@angular/core';
import { LayoutService } from './../../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { LocalStorageService } from './../../Auth/localStorageLogin/local-storage.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MessageService } from 'primeng/api';
// import { CartService } from '../serviceCart/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService],
})
export class ProductComponent implements OnInit {
  responsiveOptions2: any[] = [];
  form: FormGroup | any;
  // errorMessages = {
  // errorMessages = {
  //   message: [{ type: 'required', message: 'متن دیدگاه را وارد کنید.' }],
  // };
  customOptions1: OwlOptions = {
    autoplay: true,
    autoplaySpeed: 1000,
    autoplayTimeout: 5000,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    nav: true,
    margin: 10,
    navText: ['<i class="fa fa-chevron-left fa-2x"></i>', '<i class="fa fa-chevron-right fa-2x"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  };
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
    navText: [
      '<i class="fa fa-chevron-left fa-2x"></i>',
      '<i class="fa fa-chevron-right fa-2x"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 4,
      },
    },
  };
  responsiveOptions: any[] = [
    {
      breakpoint: '1600px',
      numVisible: 3,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  images: any[] = [];
  currentIndex: any = -1;
  showFlag: any = false;
  featuresValues: any[] = [];
  info: any[] = [];
  product: any;
  hasDiscountCode: any = false;
  // displayBasic: boolean;
  // isLogged: boolean;
  productID: string | any;
  colorName: any;
  colorPrice: any;
  colorRemain: any;
  comments: any[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public messageService: MessageService,
    private service: LayoutService,
    // public localStorage: LocalStorageService,
    private route: ActivatedRoute,
  ) {
    this.responsiveOptions2 = [
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
    this.createform();
    this.route.paramMap.subscribe((params) => (this.productID = params.get('id')));
    this.service.getProduct(this.productID).subscribe((response: { success: boolean; data: any[]; }) => {
      if (response.success === true) {
        this.product = response.data;
        this.colorName = this.product.info[0].color;
        this.colorPrice = this.product.info[0].price;
        this.colorRemain = this.product.info[0].remainsNumber;
      }
    });
    this.service.getCommentsForProduct(this.productID).subscribe((response: { success: boolean; data: any[]; }) => {
      if (response.success === true) {
        this.comments = response.data;
      }
    });

  }


  showLightbox(index: any) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  getColorName(i: any, j: any) {
    // this.infID = i._id;
    this.colorName = i.color;
    this.colorPrice = i.price;
    this.colorRemain = i.remainsNumber;
    // this.imageProductColor = i.image;
    // this.colorCode = i.colorCode;
    // this.remainsNumberColor = i.remainsNumber;
    // if(this.product.discountStatus){
    //   this.priceWithDiscount=Number(this.priceColor)-Number(this.product.Discount[0].discountPercent* this.priceColor)/100;
    // }
  }
  createform(): void {
    this.form = this.formBuilder.group({
      message: new FormControl(null)
    });
  }
  registerComment() {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJmMTFhYzU4YzVlM2EyNTM4YmYyMGI0IiwiaWF0IjoxNjYxMzQzNzkzLCJleHAiOjE2NjE3Mzk3OTN9.hY-rGJJN-B6QAXGpUtsIhOsnkm_Z-RFHNXCVHxDvsyI";
    let data = {
      productID: this.productID,
      userID: '62f11ac58c5e3a2538bf20b4',
      commentText: this.form.controls.message.value
    }
    if (this.form.controls.message.value === null) {
      this.messageService.add({
        severity: 'error',
        summary: 'خطا',
        detail: "دیدگاه را وارد نمایید",
      });
    } else {
      this.service.registerComment(token, data).subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: 'تایید',
            detail: "دیدگاه ثبت شد",
          });
        }
      });
    }

  }

  
  addToCart() {
    this.messageService.add({
      severity: 'success',
      summary: 'تایید',
      detail: "به سبد خرید اضافه شد",
    });
  }

}
