import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';

const defaultImage = 'assets/img/person.png';

@Component({
  selector: 'app-contact-image',
  templateUrl: './contact-image.component.html',
  styleUrls: ['./contact-image.component.scss']
})
export class ContactImageComponent implements OnInit, OnChanges {
  @Input() image: string = defaultImage;
  @Input() name: string;

  constructor() {}

  ngOnInit() {
    if (!this.image) {
      this.image = this.sanitizeContactImage(this.image);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.image) {
      this.image = this.sanitizeContactImage(changes.image.currentValue);
    }
  }

  private sanitizeContactImage(image?: string): string {
    if (!this.image || typeof this.image !== 'string') {
      return defaultImage;
    }

    return this.image;
  }
}
