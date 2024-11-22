import { BOT_TOKEN, CLIENT_ID, CLIENT_SECRET } from "$env/static/private";
import { json } from "@sveltejs/kit";

export async function GET(req: any, res: any) {
    const code = req.url.searchParams.get('code');
    const response = await fetch(`https://discord.com/api/oauth2/token`, {
        method: 'POST',
        body: new URLSearchParams({
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
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

    const data = (await response.json())
    const tokens = `${data.token_type} ${data.access_token}`
    /** Currently commented, but this is how you would get the information about the user
    const getUserInfo = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: tokens
        }
    })
    const userInfo = await getUserInfo.json();
    */

    const getGuilds = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: tokens
        }
    });

    let userGuilds = await getGuilds.json()

    // Filter out to only guilds that the user has admin perms on
    // Since admin permissions are just 3 bit shifts, doing the opposite
    // and then check if is equal to 0 will check if they have the permission
    userGuilds = userGuilds.filter((guild: { permissions: number }) => 3 >> guild.permissions === 0)

    return json(userGuilds)
}