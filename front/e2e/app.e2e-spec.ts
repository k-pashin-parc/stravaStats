import { StravaStatsPage } from './app.po';

describe('strava-stats App', function() {
  let page: StravaStatsPage;

  beforeEach(() => {
    page = new StravaStatsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
