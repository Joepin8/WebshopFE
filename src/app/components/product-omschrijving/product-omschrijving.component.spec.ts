import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOmschrijvingComponent } from './product-omschrijving.component';

describe('ProductOmschrijvingComponent', () => {
  let component: ProductOmschrijvingComponent;
  let fixture: ComponentFixture<ProductOmschrijvingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOmschrijvingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOmschrijvingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
