import express from 'express';
import dotenv from 'dotenv';
import { ClientApp } from '../types';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());


export const createServer = (client: ClientApp) => {
    app.get('/', (req, res) => {
        res.send('Express + TypeScript Server');
    });

    app.get('/bot-details', (req, res) => {
        res.send(client.user);
    })

    app.post('/execute/:command', async (req, res) => {
        const commandName = req.params.command;
        const options = await req.body.options
        const command = client.commands?.get(commandName);

        if (!command) {
            res.send({
                status: 404,
                message: {
                    command,
                    message: 'Command not found'
                }
            })
            return;
        }

        try {
            await command.apiExecute(client, options);
            res.sendStatus(200);
        } catch (error) {
            if (error.cause == 'channel-not-found') {
                res.send({
                    status: 404,
                    message: {
                        command,
                        message: 'Channel not found'
                    }
                })
            }
        }
    })


    return app;
}


