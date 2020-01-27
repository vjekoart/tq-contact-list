import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

const defaultImage = 'assets/img/person.png';

@Component({
  selector: 'app-contact-box',
  templateUrl: './contact-box.component.html',
  styleUrls: ['./contact-box.component.scss']
})
export class ContactBoxComponent implements OnInit, OnChanges {
  @Input() name = '[Unknown Contact]';
  @Input() image: string = defaultImage;
  @Input() favorited = false;

  @Output() openAction = new EventEmitter<void>();
  @Output() favoriteAction = new EventEmitter<void>();
  @Output() editAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();

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
