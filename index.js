import express from "express"
import AWS from "aws-sdk"
import 'dotenv/config'

const app = express()
app.use(express.json());
const port = process.env.PORT || 3000;

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCES_KEY,
    region: 'us-east-1'
});

const lambda = new AWS.Lambda();

app.all('*', (req, res) => {
    const lambdaParams = {
        FunctionName: process.env.LAMBDA_ARN,
        InvocationType: 'RequestResponse', // Synchronous invocation
        Payload: JSON.stringify({
            httpMethod: req.method,
            headers: req.headers,
            body: req.body,
            path: req.path,
            queryStringParameters: req.query,
            requestContext: {} // Add any additional context if needed
        })
    };

    lambda.invoke(lambdaParams, (err, data) => {
        if (err) {
            console.error('Error invoking Lambda:', err);
            return res.status(500).send('Error invoking Lambda');
        }

        const lambdaResponse = JSON.parse(data.Payload);
        res.set(lambdaResponse.headers || {});
        res.status(lambdaResponse.statusCode || 200);
        res.send(lambdaResponse.body);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});