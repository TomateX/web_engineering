import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {interval, map, Observable, Subscription, take} from "rxjs";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy, OnInit{

  //Timer mit für den Token
  private timer$: Observable<number>|null = null;
  private timerSubscription: Subscription|null = null;
  tokenTime = 0;

  //Variablen die, die übrige Zeit vom Timer in der Navbar anzeigt
  tokenMinute = 0;
  tokenSecond = 0;

  constructor(private authService: AuthService) {
  }

  //Beim Starten der webseite wird die expirationTime vom lacal storage genommen und neu berechnet
  ngOnInit() {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const remainingTime = +expirationTime - new Date().getTime();
      //Falls der token noch gültig ist (übrige Zeit ist noch verfügbar) startet der Timer
      if (remainingTime > 0) {
        this.startTokenTimer(remainingTime);
      }
    }
  }

  //Methode die nach Drücken des "Token holen" ausgeführt wird
  getToken() {
    //Falls ein Timer aktuell läuft, wird er gestoppt
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    //Die Mthode getToken() vom authservice wird ausgeführt und wird gewartet bis ein response kommt
    this.authService.getToken().subscribe((response: any) => {
      //Wenn ein Response gekommen ist, wird der Timer gestartet.
      this.startTokenTimer(response.expires_in * 1000);
    });
  }


  //Methode zum Starten des Timers
  startTokenTimer(initialExpirationTime: number) {
    //Jede sekunde wird der Timer aktuallisiert
    this.timer$ = interval(1000).pipe(
      take(initialExpirationTime / 1000),
      map(() => {
        //Die übrige Zeit wird jede Sekunde neu berechnet und aktuallisiert
        const remainingTime = +localStorage.getItem('expirationTime')! - new Date().getTime();
        return Math.floor(remainingTime / 1000);
      })
    );

    //Der Timer, der gerade oben drüber initialisiert wurde, wird subscribed und somit gestartet
    this.timerSubscription = this.timer$.subscribe((remainingSeconds) => {
      //Die drei variablen werden aktualliesiert, damit der User die Übrige Zeit sehen kann
      this.tokenTime = remainingSeconds;
      this.tokenSecond = this.tokenTime % 60;
      this.tokenMinute = Math.floor(this.tokenTime / 60);

      //Falls der Timer auf 0 angekommen ist, wird der Timer unsubscribed und somit gestoppt
      if (this.tokenTime <= 0) {
        this.timerSubscription?.unsubscribe();
        this.tokenTime = 0;
      }
    });
  }

  //Manuelles unsubscribe vom timersubscription
  ngOnDestroy() {
    this.timerSubscription?.unsubscribe();
  }
}
