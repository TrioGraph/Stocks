import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StkDialogComponent } from './stk-dialog.component';

describe('StkDialogComponent', () => {
  let component: StkDialogComponent;
  let fixture: ComponentFixture<StkDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StkDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
