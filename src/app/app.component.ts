import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  seeds!: number[];

  seed!: number;
  diameter!: number;
  shapeCount!: number;

  ngOnInit(): void {
    this.seeds = new Array(20).fill(0).map(() => Math.round(Math.random() * 10000000));
  }

}
