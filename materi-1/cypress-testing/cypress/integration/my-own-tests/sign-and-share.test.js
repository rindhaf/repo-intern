///<reference types="cypress" />
import 'cypress-file-upload';

const baseUrl = "http://app.privy.id";
const fileName = "test.pdf";

before(() => {
    cy.visit(baseUrl);
    cy.fixture('credential').then((data) => {
        cy.get('input[name="user[privyId]"]').type(data.privyID);
        cy.contains("CONTINUE").click();
        cy.get('input[name="user[secret]"]',{timeout: 5000}).type(data.password);
        cy.contains("CONTINUE").click();
    })
})

describe('Sign and Share Automation', () =>{

it('Automated', () =>{
   
        cy.contains("Welcome Back");
        cy.get('button[id="v-step-0"]',{timeout:10000}).click();
        cy.get('#upload-modal___BV_modal_body_ > div > div > div:nth-child(2) > a',{timeout:5000}).click();
        cy.wait(2000);

        //Upload the File
        cy.get('input[type="file"]').attachFile(fileName,{ subjectType: 'drag-n-drop' });
        cy.get("footer > button.btn.btn-danger").click();
        cy.get('button[id="step-document-1"]',{timeout:60000}).click();

        cy.get('#__layout > div > div > div.layout-default__container > div > div > div.workflow__content > div > div > div > div.workflow-sign__navigation.pdf-control > button.btn.btn-success.mx-2.my-2').click();
        cy.wait(2000)
        cy.contains('Send via QR Code').click();
        cy.contains('Send OTP').click();
        cy.get('[id=v-recipient-1]',{timeout:60000}).click();
        cy.get('div.multiselect__tags').type('YX7397');
        cy.wait(7000);
        cy.get('ul.multiselect__content').click();
        
        cy.xpath(`/html/body/div[1]/div/div/div/div[4]/div/div/div[3]/div/div/div/div[1]/div/span/div/div[1]/div/span/fieldset[2]/div/div/div`,{timeout:10000}).first().click();
        cy.xpath(`/html/body/div[1]/div/div/div/div[4]/div/div/div[3]/div/div/div/div[1]/div/span/div/div[1]/div/span/fieldset[3]/div/div/div[2]`,{timeout:2000}).click();
        cy.wait(5000);
        cy.xpath(`/html/body/div[1]/div/div/div/div[4]/div/div/div[3]/div/div/div/div[1]/div/span/div/div[1]/div/span/fieldset[3]/div/div/div[3]/ul/li[1]/span`,{timeout:10000}).click();
        cy.xpath(`/html/body/div[1]/div/div/div/div[4]/div/div/div[3]/div/div/div/div[1]/div/span/div/div[1]/div/span/div[2]/div[2]/button`).click();
        cy.xpath(`/html/body/div[1]/div/div/div/div[4]/div/div/div[3]/div/div/div/div[2]/div/div/div[2]/fieldset/div/div/div/div[2]/button`,{timeout:10000}).click();

    })

});
