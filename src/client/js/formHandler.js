// Replace checkForName with a function that checks the URL
import { checkForName } from "./nameChecker";

// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = "https://localhost:8000/api";



async function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById("name").value;
    // Check if the URL is valid
    const validUrl = await isValid(formText);
    if (!validUrl) {
        console.log("Is not Valid");
        alert("Is not Valid Url");
    } else {
        const answerNLP = await getText(formText);
        document.getElementById("results").innerHTML = `
        <p>Sentiment : ${answerNLP.sentiment} </p>
        `;
    }
}

// Function to send data to the server
const getText = async (url) => {
    const UrlText = {
        TheUrl: url,
    };
    try {
        const response = await fetch("http://localhost:8000/urlAnalyze", {
            method: "POST",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(UrlText),
        });
        if (!response.ok) {
            throw new Error(`Htpp Error ! : ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Fetch Url Error", error);
    }
};
const isValid = async (url) => {
    const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
    return pattern.test(url);
};
// Export the handleSubmit function
export { handleSubmit };
