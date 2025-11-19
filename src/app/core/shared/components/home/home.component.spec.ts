import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { ElementRef } from '@angular/core';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let mockCarouselElement: any;

  beforeEach(async () => {

    mockCarouselElement = {
      children: [
        { offsetWidth: 200 },
        { offsetWidth: 200 },
        { offsetWidth: 200 }
      ],
      scrollTo: jasmine.createSpy('scrollTo')
    };

    await TestBed.configureTestingModule({
      declarations: [HomeComponent]
    })
    .overrideComponent(HomeComponent, {
      set: { template: `<div #carousel></div>` }
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    component.carousel = new ElementRef(mockCarouselElement);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call startCarousel on ngAfterViewInit', () => {
    const spy = spyOn(component, 'startCarousel');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });

});
