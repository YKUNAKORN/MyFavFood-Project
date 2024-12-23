// Function to handle printing the content in the output div
document.getElementById("printBtn").addEventListener("click", function() {
    let printContents = document.getElementById("output").innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
});

// Function to handle clearing the output content
document.getElementById("cancelBtn").addEventListener("click", function() {
    document.getElementById("output").innerHTML = "<p>This is screen show output from HTML</p>";
});

// Function to update output content dynamically
document.getElementById("output").addEventListener("input", function() {
    // This function can be expanded if you want to add additional dynamic behaviors
    console.log("Output content updated.");
});