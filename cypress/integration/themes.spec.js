/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

import codeblocks from '../../src/components/ConsoleTest/codeblocks';

describe('Windows Terminal Themes - big screen', function () {
  beforeEach(function () {
    cy.server();
    cy.route(/api\/v1\/themes/).as('themes');
    cy.visit('/themes');
    cy.wait('@themes').then((xhr) => {
      cy.wrap(xhr.response.body.filter((theme) => theme.isDark)).as(
        'darkThemes'
      );
      cy.wrap(xhr.response.body.filter((theme) => !theme.isDark)).as(
        'lightThemes'
      );
    });
    cy.findByText('Loading...').should('not.be.visible');
  });
  xit('should download all themes using download button', function () {
    /**
     * Not sure how to test this
     * see: https://github.com/cypress-io/cypress/issues/949
     */
  });
  xit('should change themes by focusing and keyup/down', function () {
    /**
     * Not sure this is possible at the moment
     */
  });
  it('should show dark theme by default', function () {
    cy.get('@darkThemes').then((themes) => {
      // assuming we start off dark
      const currentTheme = themes[0];
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('should show all dark themes and no light themes by default', function () {
    cy.get('@themes').then((xhr) => {
      const themes = xhr.response.body;
      const lightThemes = themes.filter((theme) => !theme.isDark);
      const darkThemes = themes.filter((theme) => theme.isDark);
      cy.findAllByTestId('theme-option').should(
        'have.length',
        darkThemes.length
      );
      cy.findAllByTestId('theme-option').each(($el) => {
        expect(lightThemes.map((theme) => theme.name)).to.not.include(
          $el.text()
        );
        expect(darkThemes.map((theme) => theme.name)).to.include($el.text());
      });
    });
  });
  it('when selecting light theme, it should show all light themes and no dark', function () {
    // we are never clicking the actual radio button just the label, so it's fine to be covered
    cy.findByLabelText(/Light/).click({force: true});
    cy.findByLabelText(/Light/).should('be.checked');
    cy.get('@themes').then((xhr) => {
      const themes = xhr.response.body;
      const lightThemes = themes.filter((theme) => !theme.isDark);
      const darkThemes = themes.filter((theme) => theme.isDark);
      cy.findAllByTestId('theme-option').should(
        'have.length',
        lightThemes.length
      );
      cy.findAllByTestId('theme-option').each(($el) => {
        expect(lightThemes.map((theme) => theme.name)).to.include($el.text());
        expect(darkThemes.map((theme) => theme.name)).to.not.include(
          $el.text()
        );
      });
    });
  });
  it('should be able to select a new theme', function () {
    cy.get('@darkThemes').then((themes) => {
      // assuming we start off dark
      let currentTheme = themes[0];
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
      // get the next theme in the list
      const nextTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText('Select theme').select(nextTheme.name);
      cy.findByLabelText('Select theme').should('have.value', nextTheme.name);
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
    //
  });
  it('should be able to select a new theme, in light mode', function () {
    cy.get('@lightThemes').then((themes) => {
      // we are never clicking the actual radio button just the label, so it's fine to be covered
      cy.findByLabelText(/Light/).click({force: true});
      cy.findByLabelText(/Light/).should('be.checked');
      // always the first is selected
      let currentTheme = themes[0];
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
      // get the next theme in the list
      const nextTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText('Select theme').select(nextTheme.name);
      cy.findByLabelText('Select theme').should('have.value', nextTheme.name);
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('should default to theme in param for sharing', function () {
    cy.get('@darkThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${currentTheme.name}`);
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('should default to light theme in param for sharing', function () {
    cy.get('@lightThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${currentTheme.name}`);
      cy.findByLabelText(/Light/).should('be.checked');
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('UI always be visible', function () {
    const elementsAreVisible = () => {
      cy.findByLabelText('Select theme').should('be.visible');
      cy.findByText(/Prev/).should('be.visible');
      cy.findByText(/Next/).should('be.visible');
      cy.findByLabelText(/Light/).should('be.visible');
      cy.findByLabelText(/Dark/).should('be.visible');
      cy.findByLabelText(/Terminal/).should('be.visible');
      cy.findByLabelText(/Colours/).should('be.visible');
      cy.findByText(/Info/).should('be.visible');
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    };
    elementsAreVisible();
    cy.viewport(1366, 768);
    elementsAreVisible();
    cy.viewport(414, 736);
    elementsAreVisible();
  });
});

describe('Themes - small screen', function () {
  beforeEach(function () {
    cy.server();
    cy.viewport(414, 736);
    cy.route(/api\/v1\/themes/).as('themes');
    cy.visit('/themes');
    cy.wait('@themes').then((xhr) => {
      cy.wrap(xhr.response.body.filter((theme) => theme.isDark)).as(
        'darkThemes'
      );
      cy.wrap(xhr.response.body.filter((theme) => !theme.isDark)).as(
        'lightThemes'
      );
    });
    cy.findByText('Loading...').should('not.be.visible');
  });
  it('default to first dark theme', function () {
    cy.get('@themes').then((xhr) => {
      const themes = xhr.response.body;
      const lightThemes = themes.filter((theme) => !theme.isDark);
      const darkThemes = themes.filter((theme) => theme.isDark);
      cy.findAllByTestId('theme-option').should(
        'have.length',
        darkThemes.length
      );
      cy.findAllByTestId('theme-option').each(($el) => {
        expect(lightThemes.map((theme) => theme.name)).to.not.include(
          $el.text()
        );
        expect(darkThemes.map((theme) => theme.name)).to.include($el.text());
      });
    });
  });
  it('should be able to select a new dark theme', function () {
    cy.get('@darkThemes').then((themes) => {
      // get the next theme in the list
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];

      cy.findByLabelText('Select theme').select(currentTheme.name);
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('should be able to select a new light theme', function () {
    cy.get('@lightThemes').then((themes) => {
      cy.findByLabelText(/Light/).click({force: true});
      cy.findByLabelText(/Light/).should('be.checked');
      // get the next theme in the list
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText('Select theme').select(currentTheme.name);
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('should default to theme in param for sharing', function () {
    cy.get('@darkThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${encodeURIComponent(currentTheme.name)}`);
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
  it('should default to light theme in param for sharing', function () {
    cy.get('@lightThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${encodeURIComponent(currentTheme.name)}`);
      cy.findByLabelText('Select theme').should(
        'have.value',
        currentTheme.name
      );
      // can't test clipboard
      cy.findByTestId('copyButton').should('be.visible');
      cy.findByTestId('shareButton').should('be.visible');
    });
  });
});

describe('Preview views', function () {
  beforeEach(function () {
    cy.server();
    cy.route(/api\/v1\/themes/).as('themes');
    cy.visit('/themes');
    cy.wait('@themes').then((xhr) => {
      cy.wrap(xhr.response.body.filter((theme) => theme.isDark)).as(
        'darkThemes'
      );
      cy.wrap(xhr.response.body.filter((theme) => !theme.isDark)).as(
        'lightThemes'
      );
    });
    cy.findByText('Loading...').should('not.be.visible');
    cy.wrap(codeblocks).as('codeblocks');
    cy.findByText('Loading...').should('not.be.visible');
  });
  it('should render the console view first', function () {
    cy.findByTestId('consoletest').should('be.visible');
    cy.findByTestId('colourtest').should('not.be.visible');
  });
  it('should switch the preview view', function () {
    cy.findByLabelText(/Colours/).click({force: true});
    cy.findByTestId('colourtest').should('be.visible');
    cy.findByTestId('consoletest').should('not.be.visible');
    cy.findByLabelText(/Terminal/).click({force: true});
    cy.findByTestId('consoletest').should('be.visible');
    cy.findByTestId('colourtest').should('not.be.visible');
  });
  it('show the markup for the right tab', function () {
    cy.get('@codeblocks').then(function (codeblocks) {
      codeblocks.forEach((codeblock) => {
        cy.findByLabelText(codeblock.name).should('be.visible');
      });
      codeblocks.forEach((codeblock) => {
        cy.findByLabelText(codeblock.name).click();
        cy.findByTestId('markup').should(
          'have.text',
          codeblock.markup.replace(/<[^/>]+?>([^<]+)<[^>]+?>/g, '$1')
        );
      });
    });
  });
});

describe('Menu dropdown', function () {
  it('should open and close', function () {
    cy.viewport(1366, 768);
    cy.visit('/themes');
    cy.findByTestId('morecontent').should('not.be.visible');
    cy.findByText(/Info/).click();
    cy.findByTestId('morecontent').should('be.visible');
    cy.findByText(/Info/).click();
    cy.findByTestId('morecontent').should('not.be.visible');
    cy.findByText(/Info/).click();
    cy.findByTestId('morecontent').should('be.visible');
    cy.findByTestId('overlay').click();
    cy.findByTestId('morecontent').should('not.be.visible');
    cy.viewport(414, 736);
    cy.findByTestId('morecontent').should('not.be.visible');
    cy.findByText(/Info/).click();
    cy.findByTestId('morecontent').should('be.visible');
    cy.findByText(/Info/).click();
    cy.findByTestId('morecontent').should('not.be.visible');
  });
});

describe('screenshot the app', function () {
  it('should snap', function () {
    cy.viewport(1920, 1080);
    cy.visit('/themes');
    cy.percySnapshot('default view');
    cy.findByLabelText('Select theme').select('Monokai Cmder');
    cy.percySnapshot('select Monokai Cmder');
    cy.findByText(/Next/).click();
    cy.percySnapshot('click next');
    cy.findByLabelText(/Light/).click({force: true});
    cy.percySnapshot('toggle light themes');
    cy.findByLabelText('Select theme').select('Man Page');
    cy.percySnapshot('select Man Page');
    cy.findByLabelText(/Colours/).click({force: true});
    cy.percySnapshot('toggle theme preview');
    cy.findByLabelText(/Dark/).click({force: true});
    cy.percySnapshot('toggle dark themes');
    cy.findByText(/Info/).click();
    cy.percySnapshot('open info menu');
    cy.findByText(/Info/).click();
    cy.percySnapshot('close info menu');
    cy.viewport(1280, 720);
    cy.percySnapshot('view - smaller');
    // media query change
    cy.viewport(1024, 720);
    cy.percySnapshot('view - breakpoint');
    // ipad
    cy.viewport(768, 1024);
    cy.percySnapshot('view - ipad');
    cy.viewport(375, 812);
    cy.percySnapshot('view - phone');
    cy.findByText(/Info/).click();
    cy.percySnapshot('mobile: open info');
    cy.findByText(/Info/).click();
    cy.percySnapshot('mobile: close info');
    cy.findByLabelText('Select theme').select('Monokai Cmder');
    cy.percySnapshot('mobile: select Monokai Cmder');
    cy.findByText(/Next/).click();
    cy.percySnapshot('mobile: click next');
    cy.findByLabelText(/Light/).click({force: true});
    cy.percySnapshot('mobile: toggle light themes');
    cy.findByLabelText('Select theme').select('Man Page');
    cy.percySnapshot('mobile: select Man Page');
    cy.findByLabelText(/Colours/).click({force: true});
    cy.percySnapshot('mobile: toggle theme preview');
    cy.findByLabelText(/Dark/).click({force: true});
    cy.percySnapshot('mobile: toggle dark themes');
  });
});
