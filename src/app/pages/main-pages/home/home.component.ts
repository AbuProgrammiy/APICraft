import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  lang = localStorage.getItem("language") != null ? localStorage.getItem("language") : "Uzbek"

  usersCount:number=34
  generatedTablesCount:number=130
  requestsInOneHourCount:number=12

  ngOnInit(): void {
    this.sectionScrollManager()
    this.statisticsManager()
  }

  changeLang(lang:any){
    this.lang=lang
  }

  sectionScrollManager(){
    const sections:any = document.querySelectorAll('.section');

    let isScrolling:any;
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

  statisticsManager(){
    const minus=3
    let count=minus

    this.usersCount=this.usersCount>=minus?this.usersCount-minus:this.usersCount
    this.generatedTablesCount=this.generatedTablesCount>=minus?this.generatedTablesCount-minus:this.generatedTablesCount
    this.requestsInOneHourCount=this.requestsInOneHourCount>=minus?this.requestsInOneHourCount-minus:this.requestsInOneHourCount

    const statisticsInterval = setInterval(()=>{
      if(this.usersCount>=minus){
        this.usersCount++
      }
      if(this.generatedTablesCount>=minus){
        this.generatedTablesCount++
      }
      if(this.requestsInOneHourCount>=minus){
        this.requestsInOneHourCount++
      }

      count--
      if(count==0){
        clearInterval(statisticsInterval)
      }
    },300)
  }
}
