export class UrlManager {
    static checkUserData() {
        const name = localStorage.getItem("name");
        const lastName = localStorage.getItem("lastName");
        const email = localStorage.getItem("email");

        if (!name || !lastName || !email) {
            location.href = "#/";
        }
    }
}