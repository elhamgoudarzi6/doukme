import { MessageService } from 'primeng/api';
import { LayoutService } from './../layout.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService],
})
export class ContactComponent implements OnInit {
  errorMessages = {
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
    mobile: [
      { type: 'required', message: 'شماره موبایل را وارد کنید' },
    ],
    email: [
      { type: 'required', message: 'آدرس پست الکترونیکی را وارد کنید.' },
      { type: 'email', message: 'آدرس پست الکترونیکی را صحیح وارد کنید.' },
    ],
    title: [{ type: 'required', message: 'عنوان پیام را وارد کنید.' }],
    message: [{ type: 'required', message: 'متن پیام را وارد کنید.' }],
  };
  form: FormGroup | any;
  constructor(
    private service: LayoutService,
    private messageService: MessageService
  ) { }
  ngOnInit(): void {
    this.createform();
  }

  createform(): void {
    this.form = new FormGroup({
      fullName: new FormControl(null, Validators.compose([Validators.required])),
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      mobile: new FormControl(null, Validators.compose([Validators.required])),
      title: new FormControl(null, Validators.compose([Validators.required])),
      message: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  addContactMessage() {
    this.service.addContactUs(this.form.value).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'با موفقیت ثبت شد',
        });
        window.location.reload();
      } else {
        this.messageService.add({
          severity: 'error',
          summary: ' ثبت اطلاعات ',
          detail: response.data,
        });
      }
    });
  }
}
