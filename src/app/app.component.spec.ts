/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {NotificationService} from "./notification.service";
import {NotificationMockService} from "./mocks/notification-mock.service";

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    });
    TestBed.overrideComponent(AppComponent,{
      set: {
        providers: [{
          provide: NotificationService,
          useClass: NotificationMockService
        }]
      }
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should remove a notification when clicked', () => {

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    const l = app.notifications.length;

    const randomNotification = app.notifications[Math.floor(Math.random() * app.notifications.length)];

    app.onNotificationClicked(randomNotification);

    expect(app.notifications.includes(randomNotification)).toBeFalsy();

    }));

});
