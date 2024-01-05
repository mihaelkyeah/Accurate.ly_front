document.querySelector("#email").addEventListener("keydown", () => {
    document.querySelector("#changeEmailButton").removeAttribute("disabled")
});
document.querySelector("#password").addEventListener("keydown", () => {
    document.querySelector("#changePasswordButton").removeAttribute("disabled")
});
document.querySelector("#confirmAccountDeletion").addEventListener('click', () => {
    window.location = "signup.html"
})