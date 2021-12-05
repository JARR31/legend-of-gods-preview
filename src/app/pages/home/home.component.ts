import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { PetitionsService } from '../../services/petitions.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public Chapters:any;
  constructor(private http: PetitionsService, private router:Router) { }

  ngOnInit(): void {
    this.Get_Chapters()

  }
  Get_Chapters(){
    this.http.get_all_chapters().then((response)=>{
      this.Chapters = response
    })
  }
  Play(chapter:any, languaje:string){
    this.router.navigate([`/${chapter.Chapter_number}/${languaje}/1`])
    
  }
}
