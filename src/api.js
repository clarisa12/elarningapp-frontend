const baseUrl = "http://localhost:8080";

export const api = async (path) => {
    const res = await fetch(baseUrl + path);
    return res.json();
};
