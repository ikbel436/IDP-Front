import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimationDialog2Component } from './cost-estimation-dialog2.component';

describe('CostEstimationDialog2Component', () => {
  let component: CostEstimationDialog2Component;
  let fixture: ComponentFixture<CostEstimationDialog2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostEstimationDialog2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostEstimationDialog2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
