import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from 'rxjs';
import {BreakpointObserver, MediaMatcher} from '@angular/cdk/layout';

export interface DarkModeState {
  prefersDark: boolean;
}

const initialState: DarkModeState = {
  prefersDark: false,
};

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private _initialState = new BehaviorSubject<DarkModeState>(initialState);
  // user dark mode state subscription
  darkModeState$ = this.checkDarkMode().pipe(switchMap((_) => this._initialState.asObservable()));
  constructor(private mediaMatcher: MediaMatcher, private bpObserver: BreakpointObserver) {
    // initiate check on stored preferences
    if (localStorage.getItem('prefersDarkMode') !== null) {
      initialState.prefersDark = JSON.parse(localStorage.getItem('prefersDarkMode') || 'false');
      this._initialState.next(initialState);
    }
  }

  checkDarkMode(): Observable<DarkModeState> {
    return this.bpObserver.observe(['(prefers-color-scheme: dark)']).pipe(
      map((prefersDark) => {
        initialState.prefersDark = prefersDark.matches;
        localStorage.setItem('prefersDarkMode', JSON.stringify(prefersDark.matches));
        return initialState;
      }),
      catchError((err) => {
        return of(initialState);
      })
    );
  }

  toggleDarkMode(): void {
    initialState.prefersDark = !initialState.prefersDark;
    this._initialState.next(initialState);
    localStorage.setItem('prefersDarkMode', JSON.stringify(initialState.prefersDark));
  }
}
