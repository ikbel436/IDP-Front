import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router} from '@angular/router';
@Component({
  selector: 'app-overview3',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule],
  templateUrl: './overview3.component.html',
  styleUrl: './overview3.component.scss'
})
export class Overview3Component {
  constructor(private router: Router){
   
  }
  navigateToTemplatesComponent() {
    this.router.navigateByUrl('/ui/cards');
}
}
