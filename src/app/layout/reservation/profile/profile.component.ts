// import { TokenService } from './../../../auth/token.service';
// import { AuthService } from './../../../auth/auth.service';
import { LocalStorageService } from './../../../auth/local-storage.service';
import { LayoutService } from './../../layout.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TokenService } from 'src/app/auth/token.service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [MessageService],
})

export class ProfileComponent implements OnInit {
  id: any;
  rate: number = 0;
  employee: any;
  weeks: any[] = [];
  images: any[] = [];
  gallery: any[] = [];
  responsiveOptions: any[] = [];
  selectedTime: string | undefined;
  user: any;
  employeeRating: any;
  public selectedDate: any;
  workPlan: any[] = [];
  filteredDates: any[] = [];
  //token: any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjJmMTFhYzU4YzVlM2EyNTM4YmYyMGI0IiwiaWF0IjoxNjU5OTc0MTk5LCJleHAiOjE2NjAzNzAxOTl9.1BSyKo8NdS6A30iVeMJB2Waw8ulxMMo2rm7V1LRB0r8";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: LayoutService,
    private messageService: MessageService,
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private token: TokenService
  ) {

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

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.paramMap.subscribe((params) => (this.id = params.get('id')));
    this.getEmployee();
    this.getEmployeeRating();
    this.getAllPlanForEmployee();
    //if (this.localStorage.getCurrentUser()) {
    //  this.getUserData();
    //  } else {
    // this.localStorage.removeCurrentUser();
    // this.router.navigate(['/auth']);
    // }
  }

  onClickselectTime(time: string): void {
    this.selectedTime = time;
  }
  onDateChange(e: any) {
    if (e.data === null) {
      this.selectedDate = this.workPlan[0];
    } else {
      this.selectedDate = e;
    }
  }

  filterDate(event: any) {
    this.filteredDates = this.workPlan.filter((item: any) => item.date.includes(event.query));
  }
  registerReservation() {
    // if (this.localStorage.getCurrentUser()) {
    if (this.selectedTime !== undefined || this.selectedDate.date !== undefined) {
      let data = {
        time: this.selectedTime,
        date: this.selectedDate.date,
        userID: this.localStorage.userID,
        employeeID: this.id
      };
      this.service.registerReservation(this.localStorage.userToken, data).subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت اطلاعات ',
            detail: 'با موفقیت ثبت شد'
          });
          window.location.reload();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا',
            detail: response.data,
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'خطا',
        detail: 'لطفا تاریخ و ساعت را انتخاب کنید',
      });
    }
    // }else{
    //   this.router.navigate(['/auth/']);
    // }
  }

  getEmployee() {
    this.service.getEmployee(this.id).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.employee = response.data;
        this.gallery = this.employee.gallery;
      }
    });
  }

  getAllPlanForEmployee() {
    this.service.getAllPlanForEmployee(this.id).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        this.workPlan = response.data;
        this.selectedDate = this.workPlan[0];
      }
    });
  }

  getEmployeeRating() {
    this.service.getEmployeeRating(this.id).subscribe((response: { success: boolean; data: any; }) => {
      if (response.success === true) {
        let x = response.data;
        this.employeeRating = Math.round(x);
        //this.agentRating=x.toFixed(2)
      }
    });
  }

  onRateChange(e: any) {
    // if (this.localStorage.getCurrentUser()) {
    this.rate = e.value;
    let data = {
      userID: this.localStorage.userID,
      employeeID: this.id,
      rating: this.rate,
    }
    this.service.registerEmployeeRating(this.localStorage.userToken, data)
      .subscribe((response: { success: boolean; data: any; }) => {
        if (response.success === true) {
          this.messageService.add({
            severity: 'success',
            summary: ' ثبت اطلاعات ',
            detail: response.data,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'خطا',
            detail: response.data,
          });
        }
      });
    // } else {
    //   this.messageService.add({
    //     severity: 'error',
    //     summary: ' ورود به سایت ',
    //     detail: 'لطفا ابتدا وارد سایت شوید.',
    //   });
    // }
  }


}
