import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'cost-estimator',
  templateUrl: './cost-estimator.component.html',
  styleUrls: ['./cost-estimator.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class CostEstimatorComponent {
  @Input() totalCost: number = 0;
}
