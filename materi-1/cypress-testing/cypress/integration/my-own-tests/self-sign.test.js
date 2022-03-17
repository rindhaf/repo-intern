import 'cypress-file-upload';

const baseUrl = "http://app.privy.id";
const fileName ="test.pdf";

before(()=>{
    cy.visit(baseUrl);
    cy.fixture('credential').then((data)=>{
        cy.get('input[name="user[privyId]"]').type(data.privyID);
        cy.contains("CONTINUE").click();
        cy.get('input[name="user[secret]"]',{timeout: 5000}).type(data.password);
        cy.contains("CONTINUE").click();
    })
})

describe('Self Sign Automation', () =>{

it('Automated', () =>{
   
    cy.get('button[id="v-step-0"]',{timeout:10000}).click();
    cy.get('.no-gutters a',{timeout:5000}).first().click();
    
    cy.wait(2000)
    cy.get('input[type="file"]').attachFile(fileName,{ subjectType: 'drag-n-drop' });
    cy.get("button.btn:nth-child(2)").click();

    
    cy.get('button[id="step-document-1"]',{timeout:20000}).click();

    cy.get('#__layout > div > div > div.layout-default__container > div > div > div.workflow__content > div > div > div > div.workflow-sign__navigation.pdf-control > button.btn.btn-success.mx-2.my-2').click();
    cy.wait(4000);
    cy.contains('Send via QR Code').click();
    cy.contains('Send OTP').click();
})

});
