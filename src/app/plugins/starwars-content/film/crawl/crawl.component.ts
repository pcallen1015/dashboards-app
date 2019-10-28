import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'starwars-crawl',
  templateUrl: './crawl.component.html',
  styleUrls: ['./crawl.component.css']
})
export class CrawlComponent implements OnInit {
  @Input() titlePrefix: number;
  @Input() title: string;
  @Input() content: string;
  public paused: boolean;

  constructor() {
    this.paused = false;
  }

  public ngOnInit() {
    this.content = this.content.replace(/(?:\r\n|\r|\n)/g, '<br />');
  }

  public pause(): void {
    this.paused = !this.paused;
  }
}
