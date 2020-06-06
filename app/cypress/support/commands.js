// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import '@percy/cypress';

Cypress.Commands.add(
  'percyResponsiveSnapshot',
  (name, width, height, options = {}) => {
    delete options.widths; // we never want to use those in this helper
    cy
      // https://docs.cypress.io/api/commands/viewport.html#Syntax
      .viewport(width, height)
      .percySnapshot(`${name} - ${width}`, {widths: [width], ...options});
    // Set back the orignal width if you'd like
    //.viewport()
  }
);
