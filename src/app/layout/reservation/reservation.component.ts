import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LayoutService } from './../layout.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [MessageService]
})
export class ReservationComponent implements OnInit {
  cats: any[] = [];
  subCats: any[] = [];
  employees: any[] = [];
  data: any = {};
  events: any[] = [];
  searchResult: any | any[] = [];
  all:any | any[] = [];
  selectedName: any;
  filteredNames: any[] = [];
  filteredCats: any[] = [];
  filteredSubCats: any[] = [];
  filteredEmployees: any[] = [];
  constructor(
    private messageService: MessageService,
    private router: Router,
    private service: LayoutService) { }



  ngOnInit() {
    this.getAllCategory();
    this.advanceSearchEmployee(this.data);
    this.allEmployee();

    this.events = [
      { status: 'جستجوی مرکز مورد نظر', detail: 'تست تست', icon: '1', color: '#fff', image: 'search.svg' },
      { status: 'انتخاب تاریخ مراجعه', detail: 'تست تست', icon: '2', color: '#fff', image: 'calendar.svg' },
      { status: 'ثبت و رزرو نوبت', detail: 'تست تست', icon: '3', color: '#fff', image: 'done.svg' },
      { status: 'مشاهده لوکیشن و پروفایل', detail: 'تست تست', icon: '4', color: '#fff', image: 'location.svg' },
    ];
  }

  onSelectName(event: any) {
    this.router.navigate(['/reservation/profile/' + event._id]);
  }

  filterName(event: any) {
    this.filteredNames = this.all.filter((item: any) => item.fullName.includes(event.query));
  }

  onCatChange(e: any) {
    delete this.data.subCatID;
    delete this.data.employeeID;
    this.data.catID = e._id;
    this.employees=[];
    this.subCats = e.EmployeeSubCat;
    this.advanceSearchEmployee(this.data);
  }

  filterCat(event: any) {
    this.filteredCats = this.cats.filter((item: any) => item.title.includes(event.query));
  }

  onSubCatChange(e: any) {
    delete this.data.employeeID;
    this.data.subCatID = e._id;
    this.employees = e.Employee;
    this.advanceSearchEmployee(this.data);
  }

  filterSubCat(event: any) {
    this.filteredSubCats = this.subCats.filter((item: any) => item.title.includes(event.query));
  }

  onEmployeeChange(e: any) {
    this.router.navigate(['/reservation/profile/' + e._id]);
  }

  filterEmployee(event: any) {
    this.filteredEmployees = this.employees.filter((item: any) => item.fullName.includes(event.query));
  }

  getAllCategory(): any {
    this.service.getAllEmployeeCat().subscribe((response: { success: boolean; data: any; }) => {
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

  allEmployee(): any {
   let data={}
    this.service.advanceSearchEmployee(data).subscribe((response: { success: boolean; data: string | any[]; }) => {
      if (response.success === true) {
        this.all = response.data;
      }
    });
  }
  advanceSearchEmployee(data: any): any {
    this.service.advanceSearchEmployee(data).subscribe((response: { success: boolean; data: string | any[]; }) => {
      if (response.success === true) {
        this.searchResult = response.data;
      }
    });
  }

  redirectToProfile(id: any): void {
    this.router.navigate(['/reservation/profile/' + id]);
  }

}
