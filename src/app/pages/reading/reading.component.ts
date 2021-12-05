import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
/// Social media modules Facebook and Google

import { PetitionsService } from '../../services/petitions.service';
@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.scss']
})
export class ReadingComponent implements OnInit {
  @ViewChild('chapter_img') chapter_img!: ElementRef;
  @ViewChild('pages') pages!: ElementRef;

  public Chapter:any;
  public All_chapters:any;
  public public_image:any = ''
  public Max_pages:any = []


  constructor(private http:PetitionsService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      let param:any = params
      param = param.params
      console.log(param)
      this.get_chapter(param.chapter, param.languaje, param.page)
    })


  }
  get_fullnames(languaje:string){
    this.http.get_chapters_fullnames(languaje).then((response)=>{
      this.All_chapters = response
    })

  }
  get_chapter(chapter:string, languaje:string, page:string){
    this.http.get_one_chapter({chapter,languaje, page}).then((response)=>{
      this.get_fullnames(languaje)
      console.log(response)
      this.Chapter = response
      this.chapter_img.nativeElement.style.backgroundImage  = `url(${this.Chapter.Chapter_page.Page_image})`
      this.Max_pages = []
      let pages:any = this.Chapter.Max_pages
      for(let x = 1;x <= pages;x++){
        this.Max_pages.push(x)
      }
    }).catch((error)=>{console.log(error)})
  }


  select_page(page:string){
    this.router.navigate([`/${this.Chapter.Chapter_number}/${this.Chapter.Chapter_languaje}/${page}`])
  }
  change_page(next:boolean){
    let newpage:any = parseInt(this.pages.nativeElement.value)
    if(next){
      if(newpage < this.Max_pages.length){
        newpage = (newpage+1).toString()
        this.router.navigate([`/${this.Chapter.Chapter_number}/${this.Chapter.Chapter_languaje}/${newpage}`])
        this.pages.nativeElement.value = newpage
      }
    }else{
      if(newpage > 1){
        newpage = (newpage-1).toString()
        this.router.navigate([`/${this.Chapter.Chapter_number}/${this.Chapter.Chapter_languaje}/${newpage}`])
        this.pages.nativeElement.value = newpage
      }
    }
  }
  select_chapter(chapter:string){
    this.router.navigate([`/${chapter}/${this.Chapter.Chapter_languaje}/1`])
    this.pages.nativeElement.value = 1
  }

  change_languaje(Languaje:string){
    this.get_fullnames(Languaje)
    this.router.navigate([`/${this.Chapter.Chapter_number}/${Languaje}/${this.pages.nativeElement.value}`])
  }
}
