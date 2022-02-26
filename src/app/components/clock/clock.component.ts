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
  seconds: string | undefined = '00';
  minutes: string | undefined = '00';
  hours: string | undefined = '00';
  @HostBinding('class') class = 'c-clock';
  @ViewChild('secondsDigit') secondsDigit!: ElementRef;
  @ViewChild('minutesDigit') minutesDigit!: ElementRef;
  @ViewChildren('digit', {read: ElementRef}) digit!: QueryList<ElementRef>;
  constructor(private element: ElementRef, private render: Renderer2, private ngZone: NgZone) {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit(): void {}

  private initGSAP(): void {
    const digits = this.digit.map((d) => d.nativeElement);
    setInterval(() => {
      const date = moment();
      this.seconds = date.format('ss');
      this.minutes = date.format('mm');
      this.hours = date.format('hh');
      gsap.to(digits[0], {
        yPercent: -Number(this.seconds) / 6,
      });
      gsap.to(digits[1], {
        yPercent: Number(this.seconds) / 6,
      });
      gsap.to(digits[2], {
        yPercent: -Number(this.seconds) / 4,
      });

      console.log(Number(this.seconds) / 2);
    }, 1000);
  }

  ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      this.initGSAP();
    });
  }
}
