import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoscadastroComponent } from './cursoscadastro.component';

describe('CursoscadastroComponent', () => {
  let component: CursoscadastroComponent;
  let fixture: ComponentFixture<CursoscadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursoscadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursoscadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
