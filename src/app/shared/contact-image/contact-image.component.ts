import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-image',
  templateUrl: './contact-image.component.html',
  styleUrls: ['./contact-image.component.scss']
})
export class ContactImageComponent implements OnInit {
  @Input('image') contactImage: string;
  @Input('name') contactName: string;

  constructor() {}

  ngOnInit() {}
}
