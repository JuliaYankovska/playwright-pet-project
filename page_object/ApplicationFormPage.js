class ApplicationFormPage {
  constructor(page) {
    this.page = page;

    this.email = page.getByLabel("Email Address:");
    this.retypeEmail = page.getByLabel("Retype Email Address:");
    this.password = page.getByLabel("Choose Password:");
    this.retypePassword = page.getByLabel("Retype Password:");
    this.firstName = page.getByLabel("First Name:");
    this.lastName = page.getByLabel("Last Name:");
    this.phone = page.getByLabel("Phone Number:");
  }

  async fillApplicationForm(user) {
    await this.email.fill(user.email);
    await this.retypeEmail.fill(user.email);

    await this.password.fill(user.password);
    await this.retypePassword.fill(user.password);

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);

    await this.phone.fill(user.phone);
  }
}

module.exports = ApplicationFormPage;