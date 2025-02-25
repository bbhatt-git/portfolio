function showPrompt() {
    alert("Sorry! You can't inspect or copy the source code.");
}

// Disable right-click context menu
document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
    showPrompt();
});

// Disable keyboard shortcuts for developer tools
document.addEventListener('keydown', function(event) {
    if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) ||   // Ctrl+Shift+I
        (event.ctrlKey && event.shiftKey && event.keyCode == 67) ||   // Ctrl+Shift+C
        (event.ctrlKey && event.shiftKey && event.keyCode == 74) ||   // Ctrl+Shift+J
        (event.ctrlKey && event.keyCode == 85) ||                     // Ctrl+U
        (event.ctrlKey && event.keyCode == 67)) {                     // Ctrl+C
        event.preventDefault();
        showPrompt();
    }
});