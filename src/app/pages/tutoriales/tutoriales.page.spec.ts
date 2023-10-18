import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TutorialesPage } from './tutoriales.page';

describe('TutorialesPage', () => {
  let component: TutorialesPage;
  let fixture: ComponentFixture<TutorialesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TutorialesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
