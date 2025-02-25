const scriptURL = 'https://script.google.com/macros/s/AKfycbyba49ZLsyk5C2e8zKBevq3k_DbCBPUK_ebgbHEQIy_l2TG_rFVqniBB9TQ4aebxnw5/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => console.log('Success!', response))
        .catch(error => console.error('Error!', error.message))
})

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
}

function toggleDarkMode() {
    document.querySelector('.screen').style.background = '#3e3e3e';
    document.querySelector('.screen').style.color = '#ffffff';
    document.querySelector('.screen-header').style.background = '#4d4d4f';
    document.querySelector('.dropdown').style.background = '#4d4d4f';
    document.querySelectorAll('.dropdown-link').forEach(link => link.style.color = '#ffffff');
    document.getElementById('dark-mode-link').style.color = '#ea1d6f';
    document.getElementById('light-mode-link').style.color = '#e2e1e1';
    document.querySelector('.social-media-links').style.background = '#4b4b4b83';
    document.querySelector('.social-svg-main').style.background = '#807e7ea4';
}

function toggleLightMode() {
    document.querySelector('.screen').style.background = '#e6e2e2';
    document.querySelector('.screen').style.color = '#000000';
    document.querySelector('.screen-header').style.background = '#ddd';
    document.querySelector('.dropdown').style.background = '#e6e2e2';
    document.querySelectorAll('.dropdown-link').forEach(link => link.style.color = '#000000');
    document.getElementById('light-mode-link').style.color = '#ea1d6f';
    document.getElementById('dark-mode-link').style.color = '#4d4d4f';
    document.querySelector('.social-media-links').style.background = '#ceddd365';
    document.querySelector('.social-svg-main').style.background = '#fbfcfb9c';
}
