import { CandorSampleNgCliPage } from './app.po';

describe('candor-sample-ng-cli App', () => {
  let page: CandorSampleNgCliPage;

  beforeEach(() => {
    page = new CandorSampleNgCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
