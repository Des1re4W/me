function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const error = document.getElementById("errorMsg");

    if (name.length < 2) {
        error.textContent = "Name must be at least 2 characters.";
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        error.textContent = "Please enter a valid email.";
        return false;
    }

    if (message.length < 10) {
        error.textContent = "Message must be at least 10 characters.";
        return false;
    }

    error.textContent = "";
    return true;
}