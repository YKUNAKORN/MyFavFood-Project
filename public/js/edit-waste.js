document.addEventListener("DOMContentLoaded", function () {
    const currentDateElement = document.querySelector(".current-date");
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-US', options);

    // Set the formatted date
    currentDateElement.textContent = `Date : ${formattedDate}`;
});