export interface Game {
    appid: number;
    title: string;
    playtimeHours: number;
    iconUrl: string;
    source: string;
    genre: string;
    platform: string;
    description: string;
    progress: number;
    coverUrl?: string;
}
//TODO: Play around with fields with what is received from Steam API @https://developer.valvesoftware.com/wiki/Steam_Web_API#GetNewsForApp_.28v0001.29
// use Steam's GetPlayerAchievements to fill progress field 