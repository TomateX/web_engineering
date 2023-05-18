import { Component } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {interval, Observable, Subscription, take} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private timer$: Observable<number>|null = null;
  private timerSubscription: Subscription|null = null;

  tokenTime = 0;
  tokenMinute = 0;
  tokenSecond = 0;

  constructor(private authService: AuthService) {
    this.updateTokenExpirationTime();
  }

  getToken(){
    this.authService.getToken();
    this.updateTokenExpirationTime();
  }


  updateTokenExpirationTime() {
    if (this.timerSubscription && !this.timerSubscription.closed) {
      this.timerSubscription.unsubscribe();
      this.updateTokenExpirationTime();
    } else {

      const initialExpirationTime = Date.now() + (3600 * 1000);

      this.timer$ = interval(100).pipe(take(3600));

      this.timerSubscription = this.timer$.subscribe(() => {
        this.tokenTime = Math.floor((initialExpirationTime - Date.now()) / 1000);
        this.tokenSecond = this.tokenTime%60;
        this.tokenMinute = (this.tokenTime-this.tokenSecond)/60;
      });
    }
  }

}
