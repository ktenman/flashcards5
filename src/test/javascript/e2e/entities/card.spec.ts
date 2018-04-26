import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Card e2e test', () => {

    let navBarPage: NavBarPage;
    let cardDialogPage: CardDialogPage;
    let cardComponentsPage: CardComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Cards', () => {
        navBarPage.goToEntity('card');
        cardComponentsPage = new CardComponentsPage();
        expect(cardComponentsPage.getTitle())
            .toMatch(/flashcardsApp.card.home.title/);

    });

    it('should load create Card dialog', () => {
        cardComponentsPage.clickOnCreateButton();
        cardDialogPage = new CardDialogPage();
        expect(cardDialogPage.getModalTitle())
            .toMatch(/flashcardsApp.card.home.createOrEditLabel/);
        cardDialogPage.close();
    });

    it('should create and save Cards', () => {
        cardComponentsPage.clickOnCreateButton();
        cardDialogPage.setFrontInput('front');
        expect(cardDialogPage.getFrontInput()).toMatch('front');
        cardDialogPage.setBackInput('back');
        expect(cardDialogPage.getBackInput()).toMatch('back');
        cardDialogPage.getKnownInput().isSelected().then((selected) => {
            if (selected) {
                cardDialogPage.getKnownInput().click();
                expect(cardDialogPage.getKnownInput().isSelected()).toBeFalsy();
            } else {
                cardDialogPage.getKnownInput().click();
                expect(cardDialogPage.getKnownInput().isSelected()).toBeTruthy();
            }
        });
        cardDialogPage.getEnabledInput().isSelected().then((selected) => {
            if (selected) {
                cardDialogPage.getEnabledInput().click();
                expect(cardDialogPage.getEnabledInput().isSelected()).toBeFalsy();
            } else {
                cardDialogPage.getEnabledInput().click();
                expect(cardDialogPage.getEnabledInput().isSelected()).toBeTruthy();
            }
        });
        cardDialogPage.userSelectLastOption();
        cardDialogPage.save();
        expect(cardDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CardComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-card div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CardDialogPage {
    modalTitle = element(by.css('h4#myCardLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    frontInput = element(by.css('input#field_front'));
    backInput = element(by.css('textarea#field_back'));
    knownInput = element(by.css('input#field_known'));
    enabledInput = element(by.css('input#field_enabled'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setFrontInput = function(front) {
        this.frontInput.sendKeys(front);
    };

    getFrontInput = function() {
        return this.frontInput.getAttribute('value');
    };

    setBackInput = function(back) {
        this.backInput.sendKeys(back);
    };

    getBackInput = function() {
        return this.backInput.getAttribute('value');
    };

    getKnownInput = function() {
        return this.knownInput;
    };
    getEnabledInput = function() {
        return this.enabledInput;
    };
    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
