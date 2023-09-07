import jwtDecode from "jwt-decode";

function tokenDecode() {
    const token = localStorage.getItem("token")

    if(token) {
        const user = jwtDecode(token)
        return user
    }

    return null;
}

export default tokenDecode;