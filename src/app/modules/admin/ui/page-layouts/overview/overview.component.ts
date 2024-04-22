import { Component, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router} from '@angular/router';
@Component({
    selector     : 'overview',
    templateUrl  : './overview.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [MatIconModule],
})
export class OverviewComponent
{
    /**
     * Constructor
     */
    constructor(private router: Router)
    {
    }
    navigateToTemplatesComponent() {
        this.router.navigateByUrl('/ui/cards');
    }
}
