import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaRisorsaComponent } from './modifica-risorsa.component';

describe('ModificaRisorsaComponent', () => {
  let component: ModificaRisorsaComponent;
  let fixture: ComponentFixture<ModificaRisorsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificaRisorsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaRisorsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
