import { WomanPage } from './app.po';

describe('woman App', () => {
  let page: WomanPage;

  beforeEach(() => {
    page = new WomanPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
