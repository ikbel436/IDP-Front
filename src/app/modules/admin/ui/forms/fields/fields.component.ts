import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from 'app/core/user/user.service';

@Component({
    selector     : 'forms-fields',
    templateUrl  : './fields.component.html',
    styleUrls: [ './fields.component.css' ],
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatIconModule, FormsModule, MatFormFieldModule, NgClass, MatInputModule, TextFieldModule, ReactiveFormsModule, MatButtonToggleModule, MatButtonModule, MatSelectModule, MatOptionModule, MatChipsModule, MatDatepickerModule],
})
export class FormsFieldsComponent
{
    formFieldHelpers: string[] = [''];
    fixedSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    user: any; // Initialize with the user's data
    name: string;
    email: string;
    phoneNumber: string;
    description: string
    images;
    title = 'fileUpload';
    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder,private userService: UserService,private _httpClient: HttpClient)
    {
    }
    currentUser : any 
    ngOnInit(): void {
      // this.userService.get().subscribe(
      //   user => {
      //     this.currentUser = user;
      //     this.fetchImage(this.currentUser?.image);
      //   },
      //   error => {
      //     console.error('Error fetching current user:', error);
      //   }
      // );
       // const id= localStorage.getItem('id');
       // console.log(id);
        this.getUserData();

    }
  
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getUserData(): void {
        this.userService.get().subscribe(
          (response) => {
            this.user = response;
            // Initialize form fields with old values
            this.name = this.user.name;
            this.email = this.user.email;
            this.phoneNumber = this.user.phoneNumber;
            this.description = this.user.description;
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
      }
      updateUserInfo(): void {
        // Prepare updated user object
        const updatedUser = {
          name: this.name,
          email: this.email,
          phoneNumber: this.phoneNumber,
          description: this.description
        };
    
        // Call the service method to update user info
        this.userService.update(updatedUser).subscribe(
          (response) => {
            console.log('User updated successfully:', response);
            this.getUserData();
            this.currentUser =response 
            window.location.reload();
          },
          (error) => {
            console.error('Error updating user:', error);
           
          }
        );
      }
      selectImage(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.images = file;
        }
      }
      selectedImage: any 
      selectImage1(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          const reader = new FileReader();
          reader.onload = (e) => {
            this.selectedImage = e.target.result as string;
          };
          reader.readAsDataURL(file);
        }
      }
      getUserID(): string {
        const token = localStorage.getItem('accessToken');
        if (token) {
          const decodedToken = JSON.parse(atob(token.split('.')[1]));
          return decodedToken.id;
        } else {
          console.error('Token not found in local storage.');
          return null;
        }
      }
      onSubmit(){

        const userId = this.getUserID();
        const formData = new FormData();
        formData.append('file', this.images);
    
        this._httpClient.put<any>(`http://localhost:3000/auth/upload/${userId}`, formData).subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      }
      onFileSelected(files: FileList): void {
        if (files.length > 0) {
          const file = files[0];
          this.userService.uploadImage(file).subscribe(
            (response) => {
              console.log('Image uploaded successfully:', response);
              // Handle success (if needed)
            },
            (error) => {
              console.error('Error uploading image:', error);
              // Handle error (if needed)
            }
          );
        }
      }
      imageUrl: string;
      fetchImage(imageName: string): void {
        // Vérifier si imageName est défini avant d'appeler userService.getImage
        if (imageName) {
            this.userService.getImage(imageName).subscribe(
                (image: Blob) => {
                  // Créez une URL d'objet pour afficher l'image
                  this.imageUrl = URL.createObjectURL(image);
                },
                (error) => {
                  console.error('Error fetching image:', error);
                }
            );
        }
    }
    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string
    {
        return this.formFieldHelpers.join(' ');
    }
}
