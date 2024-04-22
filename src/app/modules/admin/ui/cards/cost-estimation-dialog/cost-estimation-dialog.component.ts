import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-cost-estimation-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cost-estimation-dialog.component.html',
  styleUrl: './cost-estimation-dialog.component.scss'
})
export class CostEstimationDialogComponent {
  constructor(public dialogRef: MatDialogRef<CostEstimationDialogComponent>) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
