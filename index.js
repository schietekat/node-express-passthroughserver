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

    // try {
    //     const queryParams = req.body;

    //     // Make a request to the API Gateway with the original query parameters
    //     const response = await axios.post(apiGatewayURL, JSON.stringify(queryParams));

    //     // Forward the API Gateway's response back to the client
    //     console.log(response.status, response.statusText)
    //     res.status(response.status).json(response.data);
    // } catch (error) {
    //     console.error('Error redirecting to API Gateway:', error);
    //     res.status(500).json({ error: 'An error occurred while redirecting.' });
    // }
    try {



        const xml = "xml=<pgs><data0>9265654606</data0><data>UJe4jT9BRbvM82yaRJL6vZKk/O+jFKzBwdI7aM/k5JrLScueLsHbIOEOzMsJo50Cx09TkYhU3GJX5PZLDf/pIHivv8VLPSkNJiZdoUSF7cwnUBdPIzCfX+LBfnVLZiKIjkMMuRuIq9/Xelw1Y4B9G0YL6nuX/zjxP2etT2qUFZDtsemmi3/zbLOR/S7dDBazxI7Grm6CEt35fMAwj3nD3TchBYdIUMz7F+XLmWaBmKEdVtWI/pHGZz8SkkpF4NXs118tgd9tTFNE6T9OZEktpxtGQN7FEzWwLJJBnaQUMs93WtcWXer4UChhTalb0bhwq02paJx/MjXWvtb7xMRVwmS/yYwCkKej8HXxkT6kCmxxbBJHymiy+ylKOUdc89y19rmpvokiYKv3BLmkVFZb6r2piurU05cxPLsTiZX/tN62JGcGhN0TnzvO4RvSwnvKpazHr0AvnfyAiLM/gSgD1ki9GPtVDgmf0g+VUnS9Cr98maDOKJSQkbroxWOg4iQJkl2wHVHwndyTGJHWemDD2Tla14vuSeqE5IT7EU5KlrSsvksM5zyw6MjI7Ar8aImaHwZgU+8y34pe25oo6WpnCYVNupOfsLQEvs2FZRliuy5olUssYmKKstxjziu2AzOw5lDfqkqkSB+FfOo2noPYS5EKWxUGRt+1R/0dZ7D2NnKY2pcsjwPryDx0B3dGv2wntHrHJsVQMW+I4vf6O7IiHOXpigNxCaDEVynSL57T1j4wn8+LPZCoN+0ZFo5Gs5NRcbG/8u8Qsz9tfpDaRvcD8GYMeAgNUGFVdxee/BLSCM2Q+gu/2ZhaPylp4ldg5z2WVCuCJEhYzKxyL+TM2XDo7hzR/64allS6fxn17CHqqXYtYC6/oTwm89HOp3Qxbpbr3gHyNOvKcvWR04ziieljL2hv2/Q8aXy7lTalsZ4+r+p9M1g55cKLn91JiJzoMGJEdaD/remGZ6p1MQiJshAokmvDBPW+xMKYiOnDBHHRBekOMcNzpcYiGOlXfsDemJVuPClekFYMu62uhsISmjZxV6P5xWVVTw8Mk0aDY81gXPvjzs1IrCzVQkfnx7cmil0tKLGPXgslrKGhzmjEUs+rkGcyN/IvPdNMZdIN/znfG0T0pSGPlelx6KFe4csmfw2irEGemUAtZLOJFTLL63S+3pPTB+Dgou62eTMPWdAjLPc=</data></pgs>";

        const response = await axios({

            method: "POST",
            url: "https://qa5.mitec.com.mx/p/gen",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: xml,
        });

        console.log("RESPUESTA", response)
    } catch (error) {
        console.log("Error:", error)
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