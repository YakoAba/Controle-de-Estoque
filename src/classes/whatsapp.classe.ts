import { Client } from 'whatsapp-web.js';

type MessageData = {
    messageId: string;
    body: string;
    type: string;
    timestamp: number;
    from: string;
    to: string;
    isForwarded: boolean;
    broadcast: boolean;
    fromMe: boolean;
    mentionedIds: string[];
    links: string[];
};

class WhatsAppBot {
    private client: Client;
    private connectionStatus: string;
    private static instance: WhatsAppBot;

    private setupEventHandlers(): void {
        this.client.on('qr', this.handleQr.bind(this));
        this.client.on('ready', this.handleReady.bind(this));
        this.client.on('message', this.handleMessage.bind(this));
        this.client.on('disconnected', this.handleDisconnected.bind(this));
    }

    private constructor() {
        this.client = new Client({});
        this.connectionStatus = 'disconnected';
        this.setupEventHandlers();
    }

    static getInstance(): WhatsAppBot {
        if (!WhatsAppBot.instance) {
            WhatsAppBot.instance = new WhatsAppBot();
        }
        return WhatsAppBot.instance;
    }

    private handleQr(qr: any): void {
        //console.log('QR Code:', qr);
    }

    private handleReady(): void {
        console.log('Client is ready!');
        this.connectionStatus = 'connected';
    }

    private handleMessage(message: any): void {
        if (message.type === 'chat') {
            const messageData: MessageData = {
                messageId: message.id._serialized,
                body: message.body,
                type: message.type,
                timestamp: message.timestamp,
                from: message.from,
                to: message.to,
                isForwarded: message.isForwarded,
                broadcast: message.broadcast,
                fromMe: message.fromMe,
                mentionedIds: message.mentionedIds,
                links: message.links,
            };

            // console.log(messageData);
        }
    }

    private handleDisconnected(reason: string): void {
        console.log(`Client was logged out. Reason: ${reason}`);
        this.connectionStatus = 'disconnected';
    }

    getQrCode(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.client.once('qr', (qr: string) => {
                resolve(qr);
            });

            this.client.once('ready', () => {
                reject(new Error('Client is already connected.'));
            });
        });
    }

    getStatus(): string {
        return this.connectionStatus;
    }

    initialize(): void {
        this.client.initialize();
        this.connectionStatus = 'initialized';
    }

    async sendMessage(to: string, content: string): Promise<{ success: boolean; message?: any; error?: string }> {
        try {
            const message = await this.client.sendMessage(to, content);
            return { success: true, message };
        } catch (error) {
            console.error(`Error sending message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    async connect(): Promise<{ success: boolean; error?: string }> {
        try {
            // await this.client.destroy();
            // this.connectionStatus = 'disconnected';

            this.client = new Client({});
            this.connectionStatus = 'create';
            this.setupEventHandlers();
            this.initialize();

            return { success: true };
        } catch (error) {
            console.error(`Error onnecting: ${error.message}`);
            return { success: false, error: error.message };
        }
    }

    async disconnect(): Promise<{ success: boolean; error?: string }> {
        try {
            await this.client.destroy();
            this.connectionStatus = 'disconnected';
            return { success: true };
        } catch (error) {
            console.error(`Error disconnecting: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
}

export default WhatsAppBot;

