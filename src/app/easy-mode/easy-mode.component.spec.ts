import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EasyModeComponent } from './easy-mode.component';

describe('EasyModeComponent', () => {
  let component: EasyModeComponent;
  let fixture: ComponentFixture<EasyModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EasyModeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EasyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
