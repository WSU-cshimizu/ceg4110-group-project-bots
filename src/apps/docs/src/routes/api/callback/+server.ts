import { BOT_TOKEN, CLIENT_ID } from "$env/static/private";
import { json } from "@sveltejs/kit";


export async function GET(req: any, res: any) {
    const code = req.url.searchParams.get('code');
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'POST',
        body: new URLSearchParams({
            'client_id': CLIENT_ID,
            'client_secret': BOT_TOKEN,
            'grant_type': 'authorization_code',
            'redirect_uri': 'http://localhost:5170/api/callback',
            'code': code,
            'scope': 'identify guilds'
        }),
        headers:
        {
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    })

    const data = await response.json()

    console.log('data', data);


    return JSON.stringify(data)
}