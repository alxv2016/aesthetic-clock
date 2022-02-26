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
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import * as moment from 'moment';

@Component({
  selector: 'c-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit, AfterViewInit {
  seconds: string | undefined = '10';
  minutes: string | undefined = '10';
  hours: string | undefined = '10';
  todaysDate: string | undefined = 'Friday, January 16 2022';
  meridian: string | undefined = 'am';
  @HostBinding('class') class = 'c-clock';
  @ViewChild('secondsDigit') secondsDigit!: ElementRef;
  @ViewChild('minutesDigit') minutesDigit!: ElementRef;
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {
    const humanDate = moment();
    this.todaysDate = humanDate.format('dddd, MMMM DD YYYY');
  }

  private initTime(gsapTimeLine: GSAPTimeline): void {
    const now = moment();
    const percent = Number(this.seconds) / 6;
    this.seconds = now.format('ss');
    this.minutes = now.format('mm');
    this.hours = now.format('hh');
    this.meridian = now.format('a');

    // cloclTL
    //   .to(digits[0], {
    //     yPercent: -percent,
    //   })
    //   .to(
    //     digits[1],
    //     {
    //       yPercent: percent,
    //     },
    //     0
    //   )
    //   .to(
    //     digits[2],
    //     {
    //       yPercent: -percent,
    //     },
    //     0
    //   );
  }

  private initGSAP(): void {
    const digits = this.digit.map((d) => d.nativeElement);

    const cloclTL = gsap.timeline({
      defaults: {
        ease: 'back',
      },
    });

    // setInterval(() => {
    //   this.initTime(cloclTL);
    // }, 1000);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
