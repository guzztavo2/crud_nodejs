window.onload = function () {
    hiddenNotifications();
};


function hiddenNotifications() {
    const clickButtonWithDelay = (button, delay) => {
        setTimeout(() => button.click(), delay);
    };

    const listOfButtons = document.querySelectorAll('div.alert.alert-dismissible.fade.show > button');

    for (const [key, button] of listOfButtons.entries())
        clickButtonWithDelay(button, ((key * 1250) + 2000));
}