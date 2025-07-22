import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParcelList } from './parcel-list';

describe('ParcelList', () => {
  let component: ParcelList;
  let fixture: ComponentFixture<ParcelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParcelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
