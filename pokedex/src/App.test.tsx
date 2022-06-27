import React from 'react';
import { mount } from '@cypress/react';
import App from './App';
import Pokedex from './components/Pokedex';

  it('renders App div', () => {
    mount(<App />);
    cy.get('div').should('have.class', 'App');
  })


  it('renders Pokedex', () => {
    mount(<Pokedex />);
    cy.get('span').should('have.class', 'MuiChip-label');
  })

 