import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { LayoutService } from './../../layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-seller-intro',
  templateUrl: './seller-intro.component.html',
  styleUrls: ['./seller-intro.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]

})
export class SellerIntroComponent implements OnInit {
  faqs: any[] = [];
  events: any[] = [];
  form: FormGroup | any;
  result: any;
  constructor(
    private messageService: MessageService,
    private service: LayoutService,
    // private token: TokenService,
    // private localStorage: LocalStorageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) { }
  mobileRegix = /^0?9[0123]\d{8}$/;
  errorMessages = {
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید.' },
      { type: 'minlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'maxlength', message: 'شماره موبایل باید 11 رقم باشد.' },
      { type: 'pattern', message: 'لطفا شماره موبایل معتبر وارد کنید.' },
    ],
  };
  ngOnInit(): void {
    this.createForm();
    this.events = [
      { status: 'جستجوی مرکز مورد نظر', detail: 'تست تست', icon: '1', color: '#fff', image: 'search.svg' },
      { status: 'انتخاب تاریخ مراجعه', detail: 'تست تست', icon: '2', color: '#fff', image: 'calendar.svg' },
      { status: 'ثبت و رزرو نوبت', detail: 'تست تست تست تست تست تست تست تست تست تست تست تست تست تست تست', icon: '3', color: '#fff', image: 'done.svg' },
      { status: 'مشاهده لوکیشن و پروفایل', detail: 'تست تست', icon: '4', color: '#fff', image: 'location.svg' },
    ];
    this.faqs=[
  {question:"جهت عضویت در پنل فروشندگان چه مدارکی مورد نیاز است؟",reply:"مدارک مورد نیاز : برای فروشنده‌ی حقیقی: تصویر کارت ملی برای فروشنده‌ی حقوقی:  شماره‌ی ثبت، شناسه‌ی ملی، کد اقتصادی، روزنامه رسمی شرکت و کارت ملی صاحبین امضا "},
  {question:"مراحل ثبت نام به چه صورت است؟",reply:"شماره همراه خود را وارد کنید (شماره حتما به نام صاحب کسب و کار باید باشد) ثبت‌نام در پنل فروشندگان پر کردن فرم ثبت نام و بارگذاری مدارک مورد نیاز انتظار برای تایید و فعالسازی پنل توسط واحد پشتیبانی اپلیکیشن دکمه سپس یادگیری استفاده از پنل و ثبت اطلاعات و قیمت‌ کالاها در نهایت آغاز فروش در اپلیکیشن دکمه"},
  {question:"میزان کمیسیون در هر دسته‌بندی چقدر است؟",reply:"با اپ دکمه دیگر نیازی به پرداخت اجاره فروشگاه، طراحی سایت، دریافت پنل و... ندارید! تنها هزینه‌ای اندک برای استفاده از خدمات دکمه و کمیسیون می‌پردازید. میزان کمیسیون متناسب با دسته‌بندی کالا تعیین می‌شود و بین 3% تا 10% می باشد"},
  {question:"چرا اپلیکیشن دکمه را برای فروش محصولاتم انتخاب کنم؟",reply:"۲۴ ساعته در تمام هفته، می‌توانید سفارش دریافت کنید و بفروشید، طی حداکثر یک هفته تسویه انجام می‌شود، ارائه گزارشات مالی از طریق پنل، افزایش فروش و بازاریابی "},
  ]
  }

  createForm() {
    this.form = new FormGroup({
      mobile: new FormControl(null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(11),
          Validators.minLength(11),
          Validators.pattern(this.mobileRegix),])),
    });
  }





}
