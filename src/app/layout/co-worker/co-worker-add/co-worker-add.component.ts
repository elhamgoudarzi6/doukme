import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
//import { LocalStorageService } from './../../../../auth/local-storage.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LayoutService } from './../../layout.service';

@Component({
  selector: 'app-co-worker-add',
  templateUrl: './co-worker-add.component.html',
  styleUrls: ['./co-worker-add.component.scss'],
  providers: [MessageService],
})
export class CoWorkerAddComponent implements OnInit {
  form: FormGroup | any;
  cats: any[] = [];
  filteredCats: any[] = [];
  errorMessages = {
    jobCatID: [{ type: 'required', message: 'گروه شغلی را وارد کنید.' }],
    fullName: [
      { type: 'required', message: 'نام و نام خانوادگی را وارد کنید.' },
    ],
    nationalCode: [{ type: 'required', message: ' کد ملی را وارد کنید.' }],
  };

  constructor(
    private messageService: MessageService,
    //  private localStorage: LocalStorageService,
    private service: LayoutService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig

  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getJobCats();
  }

  onCatChange(e: any) {
    this.form.controls.jobCatID.setValue(e._id);
  }
  filterCat(event: any) {
    this.filteredCats = this.cats.filter((item: any) => item.title.includes(event.query));
  }

  getJobCats() {
    this.service.getAllJobCat().subscribe((response: { success: boolean; data: any[]; }) => {
      if (response.success === true) {
        this.cats = response.data;
      }
    });
  }

  createForm() {
    this.form = new FormGroup({
      jobCatID: new FormControl(null, Validators.compose([Validators.required])),
      fullName: new FormControl(null, Validators.compose([Validators.required])),
      nationalCode: new FormControl(null, Validators.compose([Validators.required])),
      mobile: new FormControl(this.config.data.mobile),
      degreeFile: new FormControl(null),
      phone: new FormControl(null),
      image: new FormControl(null),
      nationalCodeFile: new FormControl(null),
      cvFile: new FormControl(null),
      address: new FormControl(null),
      bio: new FormControl(null),
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
    this.service.registerJobRequest(this.form.value)
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
