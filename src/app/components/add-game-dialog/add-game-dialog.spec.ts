import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGameDialog } from './add-game-dialog';

describe('AddGameDialog', () => {
  let component: AddGameDialog;
  let fixture: ComponentFixture<AddGameDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGameDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGameDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
