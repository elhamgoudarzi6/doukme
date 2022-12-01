import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CoWorkerAddComponent } from './co-worker-add/co-worker-add.component';
import { ResultRequestComponent } from './result-request/result-request.component';
import { LayoutService } from './../layout.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-co-worker',
  templateUrl: './co-worker.component.html',
  styleUrls: ['./co-worker.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]

})
export class CoWorkerComponent implements OnInit {

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

  showAddCoWorkerDialog(): void {
    let mobile=this.form.value.mobile
    const ref = this.dialogService.open(CoWorkerAddComponent, {
      data:{
        mobile
      },
      header: 'فرم همکاری با ما',
      width: '95%',
    });
    ref.onClose.subscribe((res) => {
      if (res === true) {
        this.messageService.add({
          severity: 'success',
          summary: ' ثبت اطلاعات ',
          detail: 'اطلاعات با موفقیت ثبت شد.',
        });
      }
    });
  }


  showResultRequestDialog(): void {
    this.service.getResultJobRequest({ mobile: this.form.value.mobile })
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.result = response.data;
          let result = this.result;
          const ref = this.dialogService.open(ResultRequestComponent, {
            data: {
              result,
            },
            header: 'ویرایش و مشاهده نتیجه درخواست',
            width: '95%',
          });
          ref.onClose.subscribe((res) => {
            if (res === true) {
              this.messageService.add({
                severity: 'success',
                summary: ' ویرایش اطلاعات ',
                detail: 'اطلاعات با موفقیت ویرایش شد.',
              });
            }
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا',
            detail: response.data,
          });
        }
      });
  }


}
