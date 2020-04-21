import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioRisorsaComponent } from './dettaglio-risorsa.component';

describe('DettaglioRisorsaComponent', () => {
  let component: DettaglioRisorsaComponent;
  let fixture: ComponentFixture<DettaglioRisorsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DettaglioRisorsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioRisorsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
