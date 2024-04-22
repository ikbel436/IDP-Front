import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router} from '@angular/router';
@Component({
  selector: 'app-overview1',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [MatIconModule],
  templateUrl: './overview1.component.html',
  styleUrl: './overview1.component.scss'
})
export class Overview1Component {
  constructor(private router: Router){
   
  }
  navigateToTemplatesComponent() {
    this.router.navigateByUrl('/ui/cards');
}
}
