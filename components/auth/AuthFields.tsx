import { useState } from "react";
import { ScrollView, Text, TextInput, Pressable, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Forms } from "../../styles";
import Auth from '../../interfaces/auth';


export default function AuthFields (
        {
            auth, 
            setAuth, 
            title, 
            submit, 
            navigation 
        }: 
        {
            auth: Partial<Auth>, 
            setAuth: React.Dispatch<React.SetStateAction<Partial<Auth>>>,
            title: string,
            submit(): Promise<void>
            navigation: any
        }
    ) {

        const [validPassword, setValidPassword] = useState<Boolean>(false);
        const [validEmail, setValidEmail] = useState<Boolean>(false);

        function validatePassword (text: string) {
            let validPassword = false;
            const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
            if (text.match(pattern)) {
                validPassword = true;
                
            } else {
                showMessage({
                    message: "Icke giltigt lösenord",
                    description: "Lösenordet måste innehålla minst 4 tecken, små och stora bokstäver minst en siffra och ett specialtecken",
                    type: "warning"
                });
                
                validPassword = false;
            }

            setValidPassword(validPassword);
        }

        function validateEmail (text: string) {
            let validEmail = false;
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            if (text.match(pattern)) {
                validEmail = true;
            } else {
                showMessage({
                    message: "Icke giltig epostadress",
                    description: "E-post måste uppfylla cccc@cc.cc",
                    type: "warning"
                });

                validEmail = false;
            }

            setValidEmail(validEmail);
        }

        return (
        <ScrollView style={Forms.base}>
            {/* <Text>{title}</Text> */}
            <Text style={Forms.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) =>  {
                    validateEmail(content);
                    setAuth({...auth, email: content})
                }}
                autoCapitalize="none"
                autoCorrect={false}
                value={auth?.email}
                keyboardType="email-address"
                testID="email-field"
            />
            <Text style={Forms.label}>Lösenord</Text>

            <TextInput
                style={Forms.input}
                onChangeText={(content: string) =>  {
                    validatePassword(content);
                    setAuth({...auth, password: content})
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID="password-field"
            />
            <Button
                title= {title}
                onPress= { () => {
                    if(validPassword && validEmail) {
                        submit();
                    } else {
                        showMessage({
                            message: "Icke giltig epostadress eller lösenord",
                            type: "danger"
                        });
                    }
                }}
                accessibilityLabel={`${title} genom att trycka`}
            />

            {title === "Logga in" &&
                
                <Button
                    title="Registrera istället"
                    onPress= { () => {
                        navigation.navigate("Register");
                    }}
                />
            }

            {title === "Logga in" &&
                <Text>Genom att registrera dig får du möjlighet att spara favoritstationer.</Text>
            
            }
        </ScrollView>

        )
}