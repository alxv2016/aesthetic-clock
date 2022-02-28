import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {gsap} from 'gsap';
import * as moment from 'moment';
import {DarkModeService} from 'src/app/services/dark-mode.service';

@Component({
  selector: 'c-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, AfterViewInit {
  seconds: string | undefined = '00';
  minutes: string | undefined = '00';
  hours: string | undefined = '00';
  todaysDate: string | undefined = 'Friday, January 16 2022';
  meridian: string | undefined = 'AM';
  darkMode = false;
  @HostBinding('class') class = 'c-clock';
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  @ViewChildren('colon', {read: ElementRef}) colon!: QueryList<ElementRef>;
  constructor(
    private element: ElementRef,
    private render: Renderer2,
    private ngZone: NgZone,
    private darkModeService: DarkModeService
  ) {}

  ngOnInit(): void {
    const humanDate = moment();
    this.todaysDate = humanDate.format('dddd, MMMM DD YYYY');
    this.darkModeService.darkModeState$.subscribe((s) => console.log(s));
  }

  toggleDarkMode(): void {
    this.darkModeService.toggleDarkMode();
  }

  private initGSAP(): void {
    const colons = this.colon.map((c) => c.nativeElement);
    const digits = this.digit.map((d) => d.nativeElement);
    const clockTL = gsap.timeline({
      defaults: {
        ease: 'power3',
      },
    });

    gsap.fromTo(
      colons,
      {
        scale: 0.45,
      },
      {
        scale: 1,
        ease: 'power3',
        transformOrigin: 'center',
        repeat: -1,
        yoyo: true,
      }
    );

    let minuteCount = 0;

    setInterval(() => {
      const momentum = 12;
      const now = moment();
      const count = Number(this.seconds);
      this.seconds = now.format('ss');
      this.minutes = now.format('mm');
      this.hours = now.format('hh');
      this.meridian = now.format('A');

      if (count >= 59) {
        minuteCount += momentum;
      }
      if (minuteCount >= 60) {
        minuteCount = 0;
      }

      clockTL
        .to(digits[1], {
          xPercent: Math.floor(Math.sin(minuteCount) * momentum),
          yPercent: Math.floor(Math.cos(minuteCount) * momentum),
        })
        .to(digits[2], {
          xPercent: Math.floor(Math.sin(count) * momentum),
          yPercent: Math.floor(Math.sin(count) * momentum) * -1,
          ease: 'power4',
        });
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.initGSAP();
  }
}
