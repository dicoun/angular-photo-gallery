import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Directive } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { FavoritesComponent } from 'src/app/features/favorites/favorites.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        RouterTestingModule.withRoutes([
          { path: 'favorites', component: FavoritesComponent },
        ]),
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a relevant navigation links', () => {
    const allElements = fixture.debugElement.queryAll(By.directive(RouterLink));

    expect(allElements[0].attributes['routerLink']).toBe('/');
    expect(allElements[1].attributes['routerLink']).toBe('/favorites');
  });

  it('should show correct text on navigation buttons', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');

    expect(buttons[0].textContent.trim()).toBe('Photos');
    expect(buttons[1].textContent.trim()).toBe('Favorites');
  });

  it('should add active class to Favorites button when click it', async () => {
    await router.navigate(['/favorites']);
    fixture.detectChanges();
    const buttons = fixture.nativeElement.querySelectorAll('button');

    expect(buttons[0].classList.contains('active')).toBeFalse();
    expect(buttons[1].classList.contains('active')).toBeTrue();
  });
});
