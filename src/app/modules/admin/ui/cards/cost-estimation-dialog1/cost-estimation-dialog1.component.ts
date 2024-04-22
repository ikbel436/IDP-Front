import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-cost-estimation-dialog1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-estimation-dialog1.component.html',
  styleUrl: './cost-estimation-dialog1.component.scss'
})
export class CostEstimationDialog1Component {
  constructor(public dialogRef: MatDialogRef<CostEstimationDialog1Component>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
