import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDateComponent } from './share-date.component';

describe('ShareDateComponent', () => {
  let component: ShareDateComponent;
  let fixture: ComponentFixture<ShareDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareDateComponent]
    });
    fixture = TestBed.createComponent(ShareDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
