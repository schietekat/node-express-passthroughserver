import express from "express"
import AWS from "aws-sdk"
import 'dotenv/config'
import axios from "axios"
import https from "https"

const apiGatewayURL = process.env.API_GATEWAY_URL_CALLBACK;

const app = express()
app.use(express.json());
const port = process.env.PORT || 3000;

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCES_KEY,
    region: 'us-east-1'
});

app.post("/callback", (req, res) => {
    const requestUrl = `${apiGatewayURL}${req.originalUrl}`;
    const agent = new https.Agent({
        rejectUnauthorized: false
    });

    // Forward the request to the API Gateway using Axios
    axios({
        method: req.method,
        url: requestUrl,
        headers: req.headers,
        data: req.body,
        httpsAgent: agent
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error making ApiGateway request:', error);
        });

    res.send("Petition redirect correctly")
})

app.get('*', (req, res) => {
    console.log('new request from ', req.headers['x-forwarded-for'], req.method)
    res.status(405).send("Method not allowed")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});