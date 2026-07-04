class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginEmailInput = page.locator('input[data-qa="login-email"]');
        this.loginPasswordInput = page.locator('input[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.loginErrorMessage = page.locator('.login-form p');
        this.logoutButton = page.getByRole('link', { name: 'Logout' });

    }
async goto() {
        await this.page.goto('/login');
    }

async login(email, password) {
        await this.loginEmailInput.fill(email);
        await this.loginPasswordInput.fill(password);
        await this.loginButton.click();
    }


}

module.exports = { LoginPage };