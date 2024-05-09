import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
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
import { K8sService } from '@fuse/services/k8s/k8s.service';

@Component({
    selector     : 'forms-layouts',
    templateUrl  : './layouts.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatIconModule, FormsModule,CommonModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatDividerModule, MatCheckboxModule, MatRadioModule, MatButtonModule],
})
export class FormsLayoutsComponent
{ generatedYaml: string;
     podData = {
        podName: 'my-pod',
        image: 'nginx:latest',
        ports: [80, 443],
        cpuLimit: '500m',
        cpuRequest: '200m',
        memoryLimit: '512Mi',
        memoryRequest: '256Mi',
        label: 'my-label',
        tierlbl: 'frontend'
        // Add other dynamic fields as needed
      };
    constructor(private podService: K8sService) { }
   
    generatePodYaml(): void {
      const podData = {
        podName: 'my-pod',
        image: 'nginx:latest',
        ports: [80, 443],
        cpuLimit: '500m',
        cpuRequest: '200m',
        memoryLimit: '512Mi',
        memoryRequest: '256Mi',
        label: 'my-label',
        tierlbl: 'frontend'
        // Add other dynamic fields as needed
      };
    }
    ngOnInit(): void{
      this.podService.generatePod(this.podData).subscribe(
        response => {
          console.log(response); // Log the response for debugging
          this.generatedYaml = response; // Assign the response to a variable to display in the frontend
        console.log(this.generatedYaml)
        },
        error => {
          console.error(error); // Handle error
        }
      );
    }

}
