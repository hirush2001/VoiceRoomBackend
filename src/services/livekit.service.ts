
import {
    AccessToken
} from "livekit-server-sdk";

export async function generateRoomToken(
    username: string,
    roomName: string
) {
    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;

    if (!apiKey || !apiSecret) {
        throw new Error("LiveKit credentials are missing");
    }

    const token = new AccessToken(
        apiKey,
        apiSecret,
        {
            identity: username,
            ttl: "1h"
        }
    );

    token.addGrant({
        roomJoin: true,
        room: roomName,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true
    });

    return await token.toJwt();
}
