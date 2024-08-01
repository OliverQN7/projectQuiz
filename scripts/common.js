function checkUserData() {
    const url = new URL(location.href);

    const name = localStorage.getItem('name');
    const lastName = localStorage.getItem('lastName');
    const email = localStorage.getItem('email');

    if (!name || !lastName || !email) {
        location.href = 'index.html';
    }
}