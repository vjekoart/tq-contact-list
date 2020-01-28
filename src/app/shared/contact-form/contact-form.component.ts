import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { ContactNumber } from 'src/app/services/store.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  @Input() name = '';
  @Input() email = '';
  @Input() numbers: ContactNumber[] = [];
  @Input() image = '';
  @Input() favorited = false;

  @Input() locked = false;
  @Input() hasBack = false;
  @Input() hasCancel = false;
  @Input() hasDelete = false;
  @Input() hasEdit = false;
  @Input() hasFavorite = false;
  @Input() hasSave = false;

  @Output() backAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();
  @Output() deleteAction = new EventEmitter<void>();
  @Output() editAction = new EventEmitter<void>();
  @Output() favoriteAction = new EventEmitter<void>();
  @Output() saveAction = new EventEmitter<any>();

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: [''],
    image: [''],
    numbers: this.fb.array([
      this.fb.group({
        number: ['', Validators.required],
        name: ['', Validators.required]
      })
    ])
  });

  public fatal = {
    status: false,
    message: ''
  };

  get formNumbers() {
    return this.contactForm.get('numbers') as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.name) {
      this.contactForm.controls.name.setValue(this.name);
    }

    if (this.email) {
      this.contactForm.controls.email.setValue(this.email);
    }

    if (this.image) {
      this.contactForm.controls.image.setValue(this.image);
    }

    if (this.numbers && this.numbers.length) {
      this.formNumbers.clear();

      for (const contactNumber of this.numbers) {
        const numberControl = new FormGroup({
          name: new FormControl(contactNumber.name, Validators.required),
          number: new FormControl(contactNumber.number)
        });

        this.formNumbers.push(numberControl);
      }
    }
  }

  public onSubmit() {
    this.fatal.status = false;

    if (this.contactForm.valid) {
      this.saveAction.emit(this.contactForm.value);
      return;
    }

    let message = '';

    // Each number must have label and number
    if (this.formNumbers.length) {
      for (const entryGroup of this.formNumbers.controls) {
        /**
         * NOTE: Angular CLI may drop a warning here because it treats entryGroup
         * as an instance of AbstractControl instead of FormGroup.
         */
        if (!entryGroup.get('number').value || !entryGroup.get('name').value) {
          message = 'In numbers section, each number must have a label, and each label must have a number.';
          break;
        }
      }
    }

    // Contact full name is required
    if (!this.contactForm.controls.name.value) {
      message = 'Contact name is required.';
    }

    this.fatal.status = true;
    this.fatal.message = message;
  }

  public addNumber(ev: any) {
    ev.preventDefault();

    this.formNumbers.push(this.fb.group({
      name: ['', Validators.required],
      number: ['']
    }));
  }

  public removeNumber(ev: any, numberIndex: number) {
    ev.preventDefault();

    this.formNumbers.removeAt(numberIndex);
  }
}
