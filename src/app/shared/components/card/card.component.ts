import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CardComponent {
  constructor() {}
}
