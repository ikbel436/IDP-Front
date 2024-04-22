import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router} from '@angular/router';
@Component({
  selector: 'app-overview2',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule],
  templateUrl: './overview2.component.html',
  styleUrl: './overview2.component.scss'
})
export class Overview2Component {
  constructor(private router: Router){
   
  }
  navigateToTemplatesComponent() {
    this.router.navigateByUrl('/ui/cards');
}
}
