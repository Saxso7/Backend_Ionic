import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsociadosPage } from './asociados.page';

describe('AsociadosPage', () => {
  let component: AsociadosPage;
  let fixture: ComponentFixture<AsociadosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsociadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
