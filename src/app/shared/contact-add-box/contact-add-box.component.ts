import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-add-box',
  templateUrl: './contact-add-box.component.html',
  styleUrls: ['./contact-add-box.component.scss']
})
export class ContactAddBoxComponent implements OnInit {
  @Input('link') inputRouterLink: string;

  constructor() {}

  ngOnInit() {}
}
