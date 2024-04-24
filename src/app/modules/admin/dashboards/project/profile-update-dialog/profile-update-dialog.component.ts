import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-update-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-update-dialog.component.html',
  styleUrl: './profile-update-dialog.component.scss'
})
export class ProfileUpdateDialogComponent {
  constructor(
   
    public dialogRef: MatDialogRef<ProfileUpdateDialogComponent>
  ) { }

}
