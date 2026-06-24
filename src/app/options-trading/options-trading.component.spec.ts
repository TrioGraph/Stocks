import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsTradingComponent } from './options-trading.component';

describe('OptionsTradingComponent', () => {
  let component: OptionsTradingComponent;
  let fixture: ComponentFixture<OptionsTradingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsTradingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsTradingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
