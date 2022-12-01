import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
//import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from './../../layout.service';

@Component({
  selector: 'app-result-request',
  templateUrl: './result-request.component.html',
  styleUrls: ['./result-request.component.scss'],
  providers: [MessageService],

})
export class ResultRequestComponent implements OnInit {
  form: FormGroup | any;
  result: any;
  disabled: boolean = true;
  cats: any[] = [];
  selectedCat: any;
  errorMessages = {
    jobCatID: [{ type: 'required', message: 'گروه شغلی را وارد کنید.' }],
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
    nationalCode: [{ type: 'required', message: ' کد ملی را وارد کنید.' }],
  };
  filteredCats: any[] = [];

  constructor(
    //  private localStorage: LocalStorageService,
    private service: LayoutService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.result = this.config.data.result;
    this.getJobCats();
    this.createForm();
  }

  getJobCats() {
    this.service.getAllJobCat().subscribe((response: { success: boolean; data: any[]; }) => {
      if (response.success === true) {
        this.cats = response.data;
      }
    });
  }


  onCatChange(e: any) {
    this.form.controls.jobCatID.setValue(e._id);
  }
  filterCat(event: any) {
    this.filteredCats = this.cats.filter((item: any) => item.title.includes(event.query));
  }

  createForm() {
    this.form = new FormGroup({
      jobCatID: new FormControl(this.result.JobCat[0]._id),
      fullName: new FormControl(this.result.fullName),
      nationalCode: new FormControl(this.result.nationalCode),
      mobile: new FormControl(this.result.mobile),
      degreeFile: new FormControl(this.result.degreeFile),
      phone: new FormControl(this.result.phone),
      image: new FormControl(this.result.image),
      nationalCodeFile: new FormControl(this.result.nationalCodeFile),
      cvFile: new FormControl(this.result.cvFile),
      address: new FormControl(this.result.address),
      bio: new FormControl(this.result.bio),
    });
  }

  onFileUpload(event: any, _name: string): void {
    const file: File = event.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name);
    this.service.uploadFile(formData)
      .subscribe((response: { success: boolean; imagePath: any; data: any; }) => {
        if (response.success === true) {
          if (_name === 'image') {
            this.form.controls.image.setValue(response.imagePath);
          } else if (_name === 'nationalCodeFile') {
            this.form.controls.nationalCodeFile.setValue(response.imagePath);
          } else if (_name === 'degreeFile') {
            this.form.controls.degreeFile.setValue(response.imagePath);
          } else if (_name === 'cvFile') {
            this.form.controls.cvFile.setValue(response.imagePath);
          }
          this.messageService.add({
            severity: 'success',
            summary: 'آپلود',
            detail: 'با موفقیت آپلود شد.',
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


  submitForm() {
    this.service.updateJobRequest(this.form.value)
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.ref.close(true);
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
