import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRisorseComponent } from './lista-risorse.component';

describe('ListaRisorseComponent', () => {
  let component: ListaRisorseComponent;
  let fixture: ComponentFixture<ListaRisorseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaRisorseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRisorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
