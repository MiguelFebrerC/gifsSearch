import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.css'],
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt: string = '';

  public isLoaded: boolean = false;
  ngOnInit(): void {
    if (!this.url) throw new Error('Method not implemented.');
  }

  onLoad(): void {
    this.isLoaded = true;
  }
}
