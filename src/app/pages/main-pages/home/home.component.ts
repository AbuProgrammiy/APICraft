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
  }

  ngAfterViewInit(): void {
    this.sectionScrollManager()
  }

  lang: string = (typeof localStorage !== 'undefined') ? (localStorage.getItem("language") != null ? localStorage.getItem("language")! : "Uzbek") : "Uzbek"

  usersCount: number = 0
  tablesCount: number = 0

  changeLang(lang: any) {
    this.lang = lang
  }

  sectionScrollManager() {
    let sections: any

    if(typeof document !== "undefined"){
      sections = document.querySelectorAll('.section');
    }

    let isScrolling: any;

    if(typeof window!=='undefined'){
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
  }

  getBasicStatistics() {
    this.statisticsService.getBasicStatistics().subscribe({
      next: (response) => {
        this.usersCount = response.response.usersCount
        this.tablesCount = response.response.tablesCount
      },
      error: (err) => {}
    })
  }
}
