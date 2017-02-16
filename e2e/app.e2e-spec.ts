import { Angular2NotificationsPage } from './app.po';

describe('angular2-notifications App', function() {
  let page: Angular2NotificationsPage;

  beforeEach(() => {
    page = new Angular2NotificationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
