import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { Router } from '@angular/router'

let router: Router;

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router)
  }));

  it('should go to home page on login', () => {
    spyOn(router, 'navigate');

    component.login();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
