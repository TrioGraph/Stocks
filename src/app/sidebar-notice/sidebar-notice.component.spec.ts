import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarNoticeComponent } from './sidebar-notice.component';

describe('SidebarNoticeComponent', () => {
  let component: SidebarNoticeComponent;
  let fixture: ComponentFixture<SidebarNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarNoticeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
