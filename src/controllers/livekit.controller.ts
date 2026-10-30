
import { Request, Response } from "express";
import { generateRoomToken } from "../services/livekit.service.js";

export async function createToken(
    req: Request,
    res: Response
) {
    try {
        const { username, roomName } = req.body;

        if (
            typeof username !== "string" ||
            typeof roomName !== "string" ||
            !username.trim() ||
            !roomName.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Username and room name are required"
            });
        }

        if (
            username.length > 24 ||
            roomName.length > 64 ||
            !/^[a-zA-Z0-9_-]+$/.test(roomName)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or room name"
            });
        }

        const token = await generateRoomToken(
            username.trim(),
            roomName.trim()
        );

        return res.json({
            success: true,
            token,
            serverUrl: process.env.LIVEKIT_URL,
            roomName: roomName.trim()
        });

    } catch (error) {
        console.error("LiveKit token error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to generate voice token"
        });
    }
}
