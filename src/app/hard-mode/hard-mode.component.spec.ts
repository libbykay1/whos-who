import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HardModeComponent } from './hard-mode.component';

describe('HardModeComponent', () => {
  let component: HardModeComponent;
  let fixture: ComponentFixture<HardModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HardModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HardModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
