import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerFichierComponent } from './creer-fichier.component';

describe('CreerFichierComponent', () => {
  let component: CreerFichierComponent;
  let fixture: ComponentFixture<CreerFichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreerFichierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreerFichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
