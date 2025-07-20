import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerTestErrorComponent } from './trigger-test-error.component';

describe('TriggerTestErrorComponent', () => {
  let component: TriggerTestErrorComponent;
  let fixture: ComponentFixture<TriggerTestErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerTestErrorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriggerTestErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
