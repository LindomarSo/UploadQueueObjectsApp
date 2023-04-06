import { Component, OnInit } from '@angular/core';
import { HomeServiceService } from '../../services/home/home-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: string[] = [];

  constructor(private homeService: HomeServiceService) { }

  ngOnInit(): void {
    this.getBlobItems();
  }

  getBlobItems(): void{
    this.homeService.getItems().subscribe({
      next: (response: string[]) => {
        this.items = response;
      },
      error: (err) => {
        console.error(err)
      }
    })
  }
}
