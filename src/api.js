const baseUrl = "http://localhost:8080";

export const api = {
    readJson(res) {
        return res.json();
    },
    async get(path) {
        return this.readJson(await fetch(baseUrl + path));
    },
    async post(path, body) {
        return this.readJson(
            await fetch(baseUrl + path, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
        );
    },
    async put(path, body) {
        return this.readJson(
            await fetch(baseUrl + path, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
        );
    },
    async delete(path) {
        return this.readJson(await fetch(baseUrl + path, { method: "DELETE" }));
    },
};
