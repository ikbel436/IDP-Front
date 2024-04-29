import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/core/user/user.service';
import { FormsModule } from '@angular/forms'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
 
@Component({
  selector: 'app-profile-update-dialog',
  standalone: true,
  imports: [CommonModule,MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDividerModule, MatCheckboxModule, MatRadioModule, MatButtonModule],
  templateUrl: './profile-update-dialog.component.html',
  styleUrl: './profile-update-dialog.component.scss'
})
export class ProfileUpdateDialogComponent {
 // userId: string; // Initialize with the user's ID
  user: any; // Initialize with the user's data
  newName: string;
  newEmail: string;
  newPhoneNumber: string;
  constructor(
   
    public dialogRef: MatDialogRef<ProfileUpdateDialogComponent>,
    private userService: UserService
  ) { }
  ngOnInit(): void {
    // Fetch user data when the component initializes
   // const userId = localStorage.getItem('id');// Assign the user's ID
  //  this.getUserData();
  }

  getUserData(): void {
    this.userService.get().subscribe(
      (response) => {
        this.user = response;
        // Initialize form fields with old values
        this.newName = this.user.name;
        this.newEmail = this.user.email;
        this.newPhoneNumber = this.user.phoneNumber;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}
