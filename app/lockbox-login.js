export class LockboxLogin extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.form = this.querySelector("form");
    this.submitButton = this.querySelector("button");
    this.loginUserName = this.querySelector("#login-user");

    this.dialog = this.querySelector("dialog");
    this.closeDialogButton = this.querySelector("dialog button");

    this.form.addEventListener("submit", this.submitEventHandler.bind(this));
    this.closeDialogButton.addEventListener("click", () => {
      this.dialog.close();
    });
  }

  disconnectedCallback() {
    this.form.removeEventListener("submit", this.submitEventHandler.bind(this));
  }

  submitEventHandler(event) {
    event.preventDefault();
    this.setLoadingState(true);

    setTimeout(() => {
      const formData = new FormData(this.form);
      const { user, password } = Object.fromEntries(formData);
      const isGuestUser = this.checkIfIsGuestUser(user, password);

      if (isGuestUser) {
        this.showLoginUser(true, user);
      } else {
        this.showFailedLogin();
      }

      this.setLoadingState(false);
      this.form.reset();
    }, 1000);
  }

  checkIfIsGuestUser(user, password) {
    return user === "guest" && password === "1234";
  }

  setLoadingState(isLoading) {
    this.submitButton.disabled = isLoading;
    this.submitButton.querySelector("svg").style.display = isLoading
      ? "block"
      : "none";
  }

  showFailedLogin() {
    this.dialog.showModal();
  }

  showLoginUser(isLogged, user) {
    this.loginUserName.classList[isLogged ? "remove" : "add"]("hidden");
    this.form.classList[isLogged ? "add" : "remove"]("hidden");

    this.loginUserName.innerHTML = isLogged
      ? `Welcome back, <span class="font-semibold">Guest!</span>`
      : "";
  }
}
