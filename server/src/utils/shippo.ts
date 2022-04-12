import config from 'config';
import axios from 'axios';

const shippoApiKey = config.get<string>("shippoApiKey");

export async function trackPackage(carrier: string, trackingNumber: string){
    const url: string = `https://api.goshippo.com/tracks/${carrier}/${trackingNumber}`;
    return await axios.get(
        url,
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `ShippoToken ${shippoApiKey}`
            }
        }
    );
}