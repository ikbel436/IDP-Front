import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-cost-estimation-dialog2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-estimation-dialog2.component.html',
  styleUrl: './cost-estimation-dialog2.component.scss'
})
export class CostEstimationDialog2Component {
  constructor(public dialogRef: MatDialogRef<CostEstimationDialog2Component>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
