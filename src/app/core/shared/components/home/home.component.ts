import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  @ViewChild('carousel') carousel!: ElementRef;

  ngAfterViewInit(): void {
    this.startCarousel();
  }

  startCarousel() {
    let index = 0;

    setInterval(() => {
      const cards = this.carousel.nativeElement.children;
      const cardWidth = cards[0].offsetWidth + 16;

      this.carousel.nativeElement.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });

      index = (index + 1) % cards.length;

    }, 3000);
  }

}
