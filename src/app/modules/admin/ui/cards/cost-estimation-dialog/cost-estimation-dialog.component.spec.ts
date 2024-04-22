import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimationDialogComponent } from './cost-estimation-dialog.component';

describe('CostEstimationDialogComponent', () => {
  let component: CostEstimationDialogComponent;
  let fixture: ComponentFixture<CostEstimationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostEstimationDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostEstimationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
