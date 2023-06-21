import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {interval, map, Observable, Subscription, take} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit{

  private timer$: Observable<number>|null = null;
  private timerSubscription: Subscription|null = null;

  tokenTime = 0;
  tokenMinute = 0;
  tokenSecond = 0;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const remainingTime = +expirationTime - new Date().getTime();
      if (remainingTime > 0) {
        this.startTokenTimer(remainingTime);
      }
    }
  }

  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }

  getToken() {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.authService.getToken().subscribe((response: any) => {
      this.startTokenTimer(response.expires_in * 1000);
    });
  }

  startTokenTimer(initialExpirationTime: number) {
    this.timer$ = interval(1000).pipe(
      take(initialExpirationTime / 1000),
      map(() => {
        const remainingTime = +localStorage.getItem('expirationTime')! - new Date().getTime();
        return Math.floor(remainingTime / 1000);
      })
    );

    this.timerSubscription = this.timer$.subscribe((remainingSeconds) => {
      this.tokenTime = remainingSeconds;
      this.tokenSecond = this.tokenTime % 60;
      this.tokenMinute = Math.floor(this.tokenTime / 60);

      if (this.tokenTime <= 0) {
        this.timerSubscription?.unsubscribe();
        this.tokenTime = 0;
      }
    });
  }
}
