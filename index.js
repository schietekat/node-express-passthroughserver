import express from "express"
import AWS from "aws-sdk"
import 'dotenv/config'
import axios from "axios"
import bodyParser from "body-parser"

const apiGatewayURL = process.env.API_GATEWAY_URL_CALLBACK;

const app = express()
app.use(express.json());
app.use(bodyParser.text());
const port = process.env.PORT || 3000;

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCES_KEY,
    region: 'us-east-1'
});

app.post("/callback", async (req, res) => {
    console.log('new request from ', req.headers['x-forwarded-for'], req.method)
    // const agent = new https.Agent({
    //     rejectUnauthorized: false
    // });

    try {
        const queryParams = req.body;

        // Make a request to the API Gateway with the original query parameters
        const response = await axios.post(apiGatewayURL, JSON.stringify(queryParams));

        // Forward the API Gateway's response back to the client
        console.log(response.status, response.statusText)
        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error redirecting to API Gateway:', error);
        res.status(500).json({ error: 'An error occurred while redirecting.' });
    }

    // res.send("Petition redirect correctly")
})

app.get('*', (req, res) => {
    console.log('new request from ', req.headers['x-forwarded-for'], req.method)
    res.status(405).send("Method not allowed")
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});