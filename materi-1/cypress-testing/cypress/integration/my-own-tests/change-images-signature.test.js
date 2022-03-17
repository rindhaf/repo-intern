///<reference types="cypress" />
import 'cypress-file-upload';

const baseUrl = "app.privy.id";
const fileName = "signature.png";
const uploadSignature = () =>{
    cy.get("#upload-image___BV_modal_body_ > div:nth-child(3) > input[type=file]").attachFile(fileName);
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    cy.get("#upload-image___BV_modal_body_ > div:nth-child(4) > button.btn.btn-danger",{timeout:5000}).click();
    cy.get("#upload-image___BV_modal_body_ > div:nth-child(4) > button.btn.btn-danger.text-right",{timeout:3000}).click();    
}

before(() => {
    cy.visit(baseUrl);
    cy.fixture('credential').then((data) => {
        cy.get('input[name="user[privyId]"]').type(data.privyID);
        cy.contains("CONTINUE").click();
        cy.get('input[name="user[secret]"]',{timeout: 5000}).type(data.password);
        cy.contains("CONTINUE").click();
    })
})

describe('Change Signature Automation', () => {
    it("Automated", () => {
        cy.contains("Welcome Back",{timeout:10000});
        cy.get("#__layout > div > div > div.layout-default__container > div > div > div.wrapper > div:nth-child(2) > div.col-md-6.col-lg-7 > ul > li:nth-child(3) > a").click();
        cy.get("#__layout > div > div > div.layout-default__container > div.layout-default__body > div > div.row.mt-5.mt-md-3 > div > div > div.d-flex.align-items-center > button.btn.btn-danger.d-none.d-lg-inline-block",{timeout:20000}).click();
        cy.contains("Image",{timeout:10000}).click();
        
        cy.get('span[class="m-auto browse"]').eq(0).click();
        uploadSignature();
        cy.wait(4000)
        cy.get('span[class="m-auto browse"]',{timeout:10000}).click();
        uploadSignature();
    
        cy.contains("Save").click();
        cy.wait(5000);
        cy.get("#__layout > div > div > div.layout-default__container > div.layout-default__body > div > div:nth-child(3) > div.form-section__body.col-md-4 > div > div:nth-child(1) > div.signature-item__control.mt-3.d-flex.justify-content-between > button.btn.btn-outline-danger.mr-1",{timeout:5000}).click();
            
    });
});
