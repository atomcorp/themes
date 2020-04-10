/// <reference types="cypress" />

import '@testing-library/cypress/add-commands';

import themes from '../../src/colour-schemes.json';

describe('Windows Terminal Themes - big screen', function () {
  beforeEach(function () {
    cy.wrap(themes).as('themes');
    cy.wrap(themes.filter((theme) => theme.isDark)).as('darkThemes');
    cy.wrap(themes.filter((theme) => !theme.isDark)).as('lightThemes');
    cy.visit('/themes');
    cy.findByText('Loading...').should('not.be.visible');
  });
  it('should download all themes using download button', function () {
    /**
     * Not sure how to test this
     * see: https://github.com/cypress-io/cypress/issues/949
     */
  });
  it('should change themes by focusing and keyup/down', function () {
    /**
     * Not sure this is possible at the moment
     */
  });
  it('should show dark theme by default', function () {
    cy.get('@darkThemes').then((themes) => {
      // assuming we start off dark
      const currentTheme = themes[0];
      cy.findByLabelText(currentTheme.name).should('be.checked');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should show all dark themes and no light themes by default', function () {
    cy.get('@themes').then((themes) => {
      const lightThemes = themes.filter((theme) => !theme.isDark);
      const darkThemes = themes.filter((theme) => theme.isDark);
      lightThemes.forEach((theme) => {
        cy.findByLabelText(theme.name).should('not.exist');
      });
      darkThemes.forEach((theme) => {
        cy.findByLabelText(theme.name).should('exist');
      });
    });
  });
  it('when selecting light theme, it should show all light themes and no dark', function () {
    cy.findByLabelText('Light').click();
    cy.findByLabelText('Light').should('be.checked');
    cy.get('@themes').then((themes) => {
      const lightThemes = themes.filter((theme) => !theme.isDark);
      const darkThemes = themes.filter((theme) => theme.isDark);
      lightThemes.forEach((theme) => {
        cy.findByLabelText(theme.name).should('exist');
      });
      darkThemes.forEach((theme) => {
        cy.findByLabelText(theme.name).should('not.exist');
      });
    });
  });
  it('should be able to select a new theme', function () {
    cy.get('@darkThemes').then((themes) => {
      // assuming we start off dark
      let currentTheme = themes[0];
      cy.findByLabelText(currentTheme.name).should('be.checked');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
      // get the next theme in the list
      currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText(currentTheme.name).click().should('be.checked');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
    //
  });
  it('should be able to select a new theme, in light mode', function () {
    cy.get('@lightThemes').then((themes) => {
      cy.findByLabelText('Light').click();
      cy.findByLabelText('Light').should('be.checked');
      // always the first is selected
      let currentTheme = themes[0];
      cy.findByLabelText(currentTheme.name).should('be.checked');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
      // get the next theme in the list
      currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText(currentTheme.name).click().should('be.checked');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should default to theme in param for sharing', function () {
    cy.get('@darkThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${currentTheme.name}`);
      cy.findByLabelText(currentTheme.name)
        .should('be.checked')
        .should('be.visible');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should default to light theme in param for sharing', function () {
    cy.get('@lightThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${currentTheme.name}`);
      cy.findByLabelText('Light').should('be.checked');
      cy.findByLabelText(currentTheme.name)
        .should('be.checked')
        .should('be.visible');
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
});

describe('Themes - small screen', function () {
  beforeEach(function () {
    cy.wrap(themes).as('themes');
    cy.wrap(themes.filter((theme) => theme.isDark)).as('darkThemes');
    cy.wrap(themes.filter((theme) => !theme.isDark)).as('lightThemes');
    cy.viewport(414, 736);
    cy.visit('/themes');
    cy.findByText('Loading...').should('not.be.visible');
  });
  it('default to first dark theme', function () {
    cy.get('@darkThemes').then((themes) => {
      // assuming we start off dark
      const currentTheme = themes[0];
      cy.findByLabelText('Change theme:').should(
        'have.value',
        currentTheme.name
      );
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should be able to select a new dark theme', function () {
    cy.get('@darkThemes').then((themes) => {
      // get the next theme in the list
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText('Change theme:')
        .select(currentTheme.name)
        .should('have.value', currentTheme.name);
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should be able to select a new light theme', function () {
    cy.get('@lightThemes').then((themes) => {
      cy.findByLabelText('Light').click();
      cy.findByLabelText('Light').should('be.checked');
      // get the next theme in the list
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.findByLabelText('Change theme:')
        .select(currentTheme.name)
        .should('have.value', currentTheme.name);
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should default to theme in param for sharing', function () {
    cy.get('@darkThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${encodeURIComponent(currentTheme.name)}`);
      cy.findByLabelText('Change theme:').should(
        'have.value',
        currentTheme.name
      );
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should default to light theme in param for sharing', function () {
    cy.get('@lightThemes').then((themes) => {
      const currentTheme = themes[Math.floor(Math.random() * themes.length)];
      cy.visit(`/themes?theme=${encodeURIComponent(currentTheme.name)}`);
      cy.findByLabelText('Change theme:').should(
        'have.value',
        currentTheme.name
      );
      cy.findByTestId('selected-title').should('have.text', currentTheme.name);
      // can't test clipboard
      cy.findByText('Copy Theme').should('be.visible');
      cy.findByText('Share theme').should('be.visible');
    });
  });
  it('should have all the dark themes in the dropdown', function () {
    cy.get('@darkThemes').then((themes) => {
      const darkThemeNames = themes.map((theme) => theme.name);
      cy.findByLabelText('Change theme:').then(($el) => {
        [...$el[0].options].forEach((el) => {
          expect(darkThemeNames).to.include(el.value);
        });
      });
    });
  });
  it('should have all the light themes in the dropdown', function () {
    cy.get('@lightThemes').then((themes) => {
      cy.findByLabelText('Light').click();
      cy.findByLabelText('Light').should('be.checked');
      const lightThemeNames = themes.map((theme) => theme.name);
      cy.findByLabelText('Change theme:').then(($el) => {
        [...$el[0].options].forEach((el) => {
          expect(lightThemeNames).to.include(el.value);
        });
      });
    });
  });
  it('should change screen type when resizing', function () {
    cy.viewport(768, 736);
    cy.findByLabelText('Change theme:').should('be.visible');
    cy.findByTestId('theme-list').should('not.be.visible');
    cy.viewport(769, 736);
    cy.findByLabelText('Change theme:').should('not.be.visible');
    cy.findByTestId('theme-list').should('be.visible');
    cy.viewport(360, 736);
    cy.findByLabelText('Change theme:').should('be.visible');
    cy.findByTestId('theme-list').should('not.be.visible');
    cy.viewport(1080, 736);
    cy.findByLabelText('Change theme:').should('not.be.visible');
    cy.findByTestId('theme-list').should('be.visible');
  });
});
