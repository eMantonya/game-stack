export interface Game {
    appId: number;
    title: string;
    playtimeHours: number;
    iconUrl: string;
    source: string;
    genre: string;
    platform: string;
    description: string;
    progress: number;
}
//TODO: Play around with fields with what is received from Steam API