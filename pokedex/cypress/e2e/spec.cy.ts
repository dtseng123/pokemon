 
import 'cypress-react-selector';

describe('It should be able to  search pokemon', () => {
  before(() => {
    cy.visit('http://localhost:3000/pokedex');
    cy.waitForReact(1000, '.App');  
  });

  it('it should have Pokedex',()=>{
    cy.react('Pokedex')
    .should('exist');
  });

  it('it should have a search field', () => {
    cy.get("#pokedex-search").should('exist')
  });

  it('it should be able to search',()=>{
    cy.get('#pokedex-search').type('charizard')
  });
 

});

describe('It should be able to list pokemon', () => {
  before(() => {
    cy.visit('http://localhost:3000/pokedex');
    cy.waitForReact(1000, '.App');  
  });

  it("should have a list of pokemon", ()=>{
    cy.react('PokemonList').should('exist');
  });
  
});


describe('It should be able to access the Pokemon API', ()=> {
  const baseURL= 'https://pokeapi.co/api/v2/pokemon/'
  beforeEach(() => {
    cy.request('GET', `${baseURL}/pikachu`).as('pikachu')
   });

   it('Validate the header', () => {
    cy.get('@pikachu')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json; charset=utf-8');
    });

    it('Validate the status code', () => {
        cy.get('@pikachu')
            .its('status')
            .should('equal', 200);
    });
    debugger
    it('Validate the pokemon\'s name', () => {
        cy.get('@pikachu')
            .its('body')
            .should('include', { name: 'pikachu' });
    });
})
 