class SignupPage {
    constructor(page) {
        this.page = page;

        this.signupNameInput = page.locator('input[data-qa="signup-name"]');
        this.signupEmailInput = page.locator('input[data-qa="signup-email"]');
        this.signupButton = page.locator('button[data-qa="signup-button"]');

        this.titleMrs = page.getByLabel('Mrs.');
        this.titleMr = page.getByLabel('Mr.');
        this.passwordInput = page.locator('input[data-qa="password"]');
        this.daysDropdown = page.locator('select[data-qa="days"]');
        this.monthsDropdown = page.locator('select[data-qa="months"]');
        this.yearsDropdown = page.locator('select[data-qa="years"]');
        this.firstNameInput = page.locator('input[data-qa="first_name"]');
        this.lastNameInput = page.locator('input[data-qa="last_name"]');
        this.addressInput = page.locator('input[data-qa="address"]');
        this.countryDropdown = page.locator('select[data-qa="country"]');
        this.stateInput = page.locator('input[data-qa="state"]');
        this.cityInput = page.locator('input[data-qa="city"]');
        this.zipcodeInput = page.locator('input[data-qa="zipcode"]');
        this.mobileNumberInput = page.locator('input[data-qa="mobile_number"]');
        this.createAccountButton = page.locator('button[data-qa="create-account"]');

        this.accountCreatedText = page.getByText('ACCOUNT CREATED!');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
    }

    async goto() {
        await this.page.goto('/login');
    }

    async fillNameAndEmail(name, email) {
        await this.signupNameInput.fill(name);
        await this.signupEmailInput.fill(email);
        await this.signupButton.click();
    }

    async fillAccountDetails(userData) {
        await this.titleMrs.check();
        await this.passwordInput.fill(userData.password);
        await this.daysDropdown.selectOption(userData.day);
        await this.monthsDropdown.selectOption(userData.month);
        await this.yearsDropdown.selectOption(userData.year);
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.addressInput.fill(userData.address);
        await this.stateInput.fill(userData.state);
        await this.cityInput.fill(userData.city);
        await this.zipcodeInput.fill(userData.zipcode);
        await this.mobileNumberInput.fill(userData.mobileNumber);
        await this.createAccountButton.click();
    }
}
module.exports = { SignupPage };