// cypress/support/hooks.js

// code from this Gist

// Cypress 3.3.1 and below do not support listening to the fetch method
// Therefore, as a workaround we polyfill `fetch` with traditional XHR which
// are supported. See: https://github.com/cypress-io/cypress/issues/687
enableFetchWorkaround();

// private helpers
function enableFetchWorkaround() {
  let polyfill;

  before(() => {
    console.info('Load fetch XHR polyfill');
    cy.readFile('./cypress/support/polyfills/unfetch.umd.js').then(
      (content) => {
        polyfill = content;
      }
    );
  });

  Cypress.on('window:before:load', (win) => {
    delete win.fetch;
    // since the application code does not ship with a polyfill
    // load a polyfilled "fetch" from the test
    win.eval(polyfill);
    win.fetch = win.unfetch;
  });
}
