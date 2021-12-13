import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { JazziconService } from './jazzicon.service';

@Component({
  selector: 'ngx-jazzicon',
  templateUrl: './jazzicon.component.html',
  styleUrls: ['./jazzicon.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class JazziconComponent implements OnChanges {

  @Input() colors?: string[];
  @Input() diameter?: number;
  @Input() seed?: number | number[];
  @Input() shapeCount?: number;

  private jazzDomElement: any;

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer: Renderer2,
    private readonly jazziconService: JazziconService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.initJazzicon();
  }

  private initJazzicon() {
    const jazzDomElement = this.jazziconService.generateIdenticon(this.seed, {
      colors: this.colors,
      diameter: this.diameter,
      shapeCount: this.shapeCount,
    });
    if (this.jazzDomElement)
      this.renderer.removeChild(this.elementRef.nativeElement, this.jazzDomElement);
    this.renderer.appendChild(this.elementRef.nativeElement, jazzDomElement);
    this.jazzDomElement = jazzDomElement;
  }

}