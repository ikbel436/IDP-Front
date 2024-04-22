import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostEstimationDialog1Component } from './cost-estimation-dialog1.component';

describe('CostEstimationDialog1Component', () => {
  let component: CostEstimationDialog1Component;
  let fixture: ComponentFixture<CostEstimationDialog1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CostEstimationDialog1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CostEstimationDialog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
