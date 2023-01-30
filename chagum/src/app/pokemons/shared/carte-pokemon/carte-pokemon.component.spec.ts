import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartePokemonComponent } from './carte-pokemon.component';

describe('CartePokemonComponent', () => {
  let component: CartePokemonComponent;
  let fixture: ComponentFixture<CartePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartePokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
