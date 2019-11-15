import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvProduitComponent } from './nv-produit.component';

describe('NvProduitComponent', () => {
  let component: NvProduitComponent;
  let fixture: ComponentFixture<NvProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
