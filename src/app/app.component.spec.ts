import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let routerEvents$: Subject<any>;

  beforeEach(() => {
    routerEvents$ = new Subject<any>();

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEvents$.asObservable()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should hide header on route "/"', () => {
    const event = new NavigationEnd(1, '/', '/');
    routerEvents$.next(event);
    expect(component.showHeader).toBeFalse();
  });

  it('should hide header on route "" (empty route)', () => {
    const event = new NavigationEnd(1, '', '');
    routerEvents$.next(event);
    expect(component.showHeader).toBeFalse();
  });

  it('should show header on any other route', () => {
    const event = new NavigationEnd(1, '/planos', '/planos');
    routerEvents$.next(event);
    expect(component.showHeader).toBeTrue();
  });
});
