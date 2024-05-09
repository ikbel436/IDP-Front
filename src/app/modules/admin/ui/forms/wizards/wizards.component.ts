import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { TerraformService } from '@fuse/services/terraform/terraform.service';
import { UserService } from 'app/core/user/user.service';
import { CommonModule } from '@angular/common';
@Component({
    selector     : 'forms-wizards',
    templateUrl  : './wizards.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatIconModule, FormsModule,CommonModule, ReactiveFormsModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatButtonModule, MatCheckboxModule, MatRadioModule],
})
export class FormsWizardsComponent implements OnInit
{
    horizontalStepperForm: UntypedFormGroup;
    verticalStepperForm: UntypedFormGroup;
    showEc2Config = false;
    showS3Config = false;
    /**
     * Constructor
     */
    constructor(private _formBuilder: UntypedFormBuilder,private userService: UserService,private _httpClient: HttpClient,private  terraformService: TerraformService)
    
    {
    }
    user: any; // Initialize with the user's data
    name: string;
    email: string;
    phoneNumber: string;
    images;
    title = 'fileUpload';
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    currentUser : any 
    ngOnInit(): void
    { this.userService.get().subscribe(
        user => {
          this.currentUser = user;
        },
        error => {
          console.error('Error fetching current user:', error);
        }
      );
       // const id= localStorage.getItem('id');
       // console.log(id);
        this.getUserData();
        // Horizontal stepper form
        this.horizontalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
              ec2Selected: [false],
              s3Selected: [false]
            }),
            step2: this._formBuilder.group({
              region: ['', Validators.required],
              ami: ['', Validators.required],
              instance_type: ['', Validators.required],
              name: ['', Validators.required]
            }),
            step3: this._formBuilder.group({
              
                  s3BucketName: ['', Validators.required]
              
               
            }),
        });

        // Vertical stepper form
        this.verticalStepperForm = this._formBuilder.group({
            step1: this._formBuilder.group({
                email   : ['', [Validators.required, Validators.email]],
                country : ['', Validators.required],
                language: ['', Validators.required],
            }),
            step2: this._formBuilder.group({
                firstName: ['', Validators.required],
                lastName : ['', Validators.required],
                userName : ['', Validators.required],
                about    : [''],
            }),
            step3: this._formBuilder.group({
                byEmail          : this._formBuilder.group({
                    companyNews     : [true],
                    featuredProducts: [false],
                    messages        : [true],
                }),
                pushNotifications: ['everything', Validators.required],
            }),
        });
    }
    getUserData(): void {
        this.userService.get().subscribe(
          (response) => {
            this.user = response;
            // Initialize form fields with old values
            this.name = this.user.name;
            this.email = this.user.email;
            this.phoneNumber = this.user.phoneNumber;
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
          phoneNumber: this.phoneNumber
        };
    
        // Call the service method to update user info
        this.userService.update(updatedUser).subscribe(
          (response) => {
            console.log('User updated successfully:', response);
            // Handle success response
          },
          (error) => {
            console.error('Error updating user:', error);
            // Handle error response
          }
        );
      }
      selectImage(event) {
        if (event.target.files.length > 0) {
          const file = event.target.files[0];
          this.images = file;
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

      onSubmit() {
        const step1Data = this.horizontalStepperForm.get('step1').value;
        const step2Data = this.horizontalStepperForm.get('step2').value;
        const step3Data = this.horizontalStepperForm.get('step3').value;
        const configs = {
          region: step2Data.region,
          ami: step2Data.ami,
          instance_type: step2Data.instance_type,
          name: step2Data.name,
          generateS3Module: step1Data.s3Selected,
          s3BucketName: step3Data.s3BucketName,
          ec2Instance: step1Data.ec2Selected
        };
        if (this.horizontalStepperForm.valid) {
          const formData = this.horizontalStepperForm.value;
          this.terraformService.generateTerraform(configs)
            .subscribe(
              (response) => {
                console.log('Terraform configuration generated:', response);
                // Optionally, reset the form after successful submission
                this.horizontalStepperForm.reset();
              },
              (error) => {
                console.error('Error generating Terraform configuration:', error);
                // Handle error
              }
            );
        } else {
          // Mark all form fields as touched to display validation errors
          this.horizontalStepperForm.markAllAsTouched();
        }
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
}
