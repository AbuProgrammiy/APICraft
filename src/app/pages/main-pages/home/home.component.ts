import { Component } from '@angular/core';
import { StatisticsService } from '../../../services/statistics/statistics.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private statisticsService: StatisticsService) {
    this.getBasicStatistics()
    this.statisticsManager()
  }

  ngAfterViewInit(): void {
    this.sectionScrollManager()
  }

  lang: string = (typeof localStorage !== 'undefined') ? (localStorage.getItem("language") != null ? localStorage.getItem("language")! : "Uzbek") : "Uzbek"

  usersCount: number = 0
  tablesCount: number = 0
  requestsCount: number = 0

  changeLang(lang: any) {
    this.lang = lang
  }

  sectionScrollManager() {
    const sections: any = document.querySelectorAll('.section');

    let isScrolling: any;
    window.addEventListener('scroll', () => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        let closestSection = sections[0];
        let minDistance = Math.abs(window.scrollY - sections[0].offsetTop);

        sections.forEach((section: { offsetTop: number; }) => {
          const distance = Math.abs(window.scrollY - section.offsetTop);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });

        closestSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  }

  getBasicStatistics() {
    this.statisticsService.getBasicStatistics().subscribe({
      next: (response) => {
        this.usersCount = response.usersCount
        this.tablesCount = response.tablesCount
        this.requestsCount = response.requestsCount
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  statisticsManager() {
    const minus = 3
    let count = minus

    this.usersCount = this.usersCount >= minus ? this.usersCount - minus : this.usersCount
    this.tablesCount = this.tablesCount >= minus ? this.tablesCount - minus : this.tablesCount
    this.requestsCount = this.requestsCount >= minus ? this.requestsCount - minus : this.requestsCount

    const statisticsInterval = setInterval(() => {
      if (this.usersCount >= minus) {
        this.usersCount++
      }
      if (this.tablesCount >= minus) {
        this.tablesCount++
      }
      if (this.requestsCount >= minus) {
        this.requestsCount++
      }

      count--
      if (count == 0) {
        clearInterval(statisticsInterval)
      }
    }, 300)
  }
}
