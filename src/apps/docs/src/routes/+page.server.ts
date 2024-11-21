

export const actions = {

    ping: async () => {

        const data = {
            options: {
                channelId: '1278022279241928740',
                message: 'Hello World'
            }
        }
        const res = await fetch('http://127.0.0.1:5175/execute/ping', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        console.log(await res.text());

        return await res.statusText;
    }
}