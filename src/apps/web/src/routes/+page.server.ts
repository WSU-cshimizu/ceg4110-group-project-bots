import { CLIENT_ID, REDIRECT_URI } from '$env/static/private';
import { redirect } from '@sveltejs/kit';


export const actions = {
    login: async () => {
        redirect(308, `https://discord.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=identify+guilds`)
    },

    ping: async () => {

        const data = {
            options: {
                channelId: '1301567770047156327',
                message: 'This is an announcement',
                timestamp: Date.now(),
                guildId: '1278022279241928735',
                userId: '352024616958689280'
            }
        }
        const res = await fetch('http://127.0.0.1:5175/execute/ping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        return await res.statusText;
    }
}