import { MessageType } from "react-native-flash-message";
import config from "../config/authConfig.json";
import storage from "./storage";

const auth = {
    loggedIn: async function loggedIn() {

        // Get the token
        let token = await storage.readToken();
        const twentyFourHours = 1000 * 60 * 60 * 24;
        let notExpired;
        
        // Check that token exists and that it is not expired
        if (token !== null) {
            notExpired= (new Date().getTime() - token.date) < twentyFourHours;
        } 

        return token && notExpired;
    },
    login: async function login(email: string, password: string) {
        
        // Data object
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        // Post request
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
        
        // Store the token
        await storage.storeToken(result.data.token);

        // Return props for message
        return {
            title: "Inloggad",
            message: result.data.message,
            type:  "success" as MessageType,
        };
    },
    register: async function register(email: string, password: string) {
        
        // DAta object
        const data = {
            api_key: config.api_key,
            email: email,
            password: password,
        };

        // Post request
        const response = await fetch(`${config.base_url}/register`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            }
        });

        const result = await response.json();

        console.log(result);

        // Return props for message
        return {
            title: "Registrering",
            message: result.data.message,
            type:  "success" as MessageType,
        };


    },
    logout: async function logout() {
        console.log("Logout");
        
        // Delete the token
        await storage.deleteToken();
    }
};

export default auth;