import {google} from 'googleapis';

class GoogleApiConfig {
    private client: any;
    private redirectUrl: string;

    constructor() {
        this.redirectUrl = "";
        this.setup();
    }

    private setup = () => {
        this.client = new google.auth.OAuth2(
            `${process.env.CLIENT_ID}`,
            `${process.env.CLIENT_SECRET}`,
            `${process.env.CALLBACK_URI}`
        );

        this.redirectUrl = this.client.generateAuthUrl({
            access_type: 'offline',
            prompt: 'consent',
            scope: [ 'email', 'profile' ]
        });
    }

    public getClientOAuth2(): any {
        return this.client;
    }

    public getRedirectUrl(): string {
        return this.redirectUrl;
    }
}

export default new GoogleApiConfig();