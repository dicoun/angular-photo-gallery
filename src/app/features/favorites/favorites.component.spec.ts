import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { FavoritesService } from 'src/app/services/favorites-service/favorites.service';
import { signal } from '@angular/core';
import { Photo } from 'src/app/core/models/photo.model';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mokeFavorites = signal<Photo[]>([]);
  let data = [
    {
      id: 'b4e95f75',
      url: 'https://picsum.photos/id/167/200/300',
    },
    {
      id: '5bef952d',
      url: 'https://picsum.photos/id/312/200/300',
    },
  ];

  beforeEach(() => {
    mokeFavorites.set([]);

    TestBed.configureTestingModule({
      imports: [FavoritesComponent, RouterTestingModule],
      providers: [
        {
          provide: FavoritesService,
          useValue: {
            favorites: mokeFavorites.asReadonly(),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message when favorites list is empty', () => {
    const message = fixture.nativeElement.querySelector('p');

    expect(message).toBeTruthy;
    expect(message.textContent.trim()).toBe('No favorites photos');

    const list = fixture.nativeElement.querySelector('mat-grid-list');

    expect(list).toBe(null);
  });

  it('should render favorites list with photos', () => {
    mokeFavorites.set(data);
    fixture.detectChanges();
    const images = fixture.nativeElement.querySelectorAll('img');

    expect(images.length).toBe(2);
    expect(images[0].src).toContain('https://picsum.photos/id/167/200/300');
    expect(fixture.nativeElement.textContent).not.toContain(
      'No favorites photos',
    );
  });

  it('should be a relevant router link for a favorite photo', () => {
    mokeFavorites.set(data);
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.directive(RouterLink));

    expect(element).toBeTruthy();

    const routerLink = element.nativeElement.getAttribute(
      'ng-reflect-router-link',
    );

    expect(routerLink).toContain('/photos');
    expect(routerLink).toContain('b4e95f75');
  });
});
