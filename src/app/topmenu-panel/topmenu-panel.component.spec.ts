import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopmenuPanelComponent } from './topmenu-panel.component';

describe('TopmenuPanelComponent', () => {
  let component: TopmenuPanelComponent;
  let fixture: ComponentFixture<TopmenuPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopmenuPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopmenuPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
