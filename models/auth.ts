import { MessageType } from "react-native-flash-message";
import config from "../config/authConfig.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {
        let token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        let notExpired;
        if (token !== null) {
            notExpired= (new Date().getTime() - token.date) < twentyFourHours;
        } 

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };
        const response = await fetch (`${config.base_url}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
        });
        const result = await response.json();

        if (Object.prototype.hasOwnProperty.call(result, 'errors')) {
            return {
                title: result.errors.title,
                message: result.errors.detail,
                type: "danger" as MessageType,
            };
        }

        console.log (result.data.token);
        
        await storage.storeToken(result.data.token);

        return {
            title: "Inloggad",
            message: result.data.message,
            type:  "success" as MessageType,
        };
    },
    register: async function register(email: string, password: string) {
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        const response = await fetch(`${config.base_url}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });

        const result = await response.json();

        console.log(result);

        return {
            title: "Registrering",
            message: result.data.message,
            type:  "success" as MessageType,
        };


    },
    logout: async function logout() {
        console.log("Logout");
        await storage.deleteToken();
    }
};

export default auth;