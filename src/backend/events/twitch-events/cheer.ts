import eventManager from "../../events/EventManager";

export function triggerCheer(
    username: string,
    userId: string,
    userDisplayName: string,
    isAnonymous: boolean,
    bits: number,
    totalBits: number,
    cheerMessage: string
): void {
    eventManager.triggerEvent("twitch", "cheer", {
        userIdName: username,
        userId,
        username: userDisplayName,
        isAnonymous,
        bits,
        totalBits,
        cheerMessage
    });
}

export function triggerBitsBadgeUnlock(
    username: string,
    userId: string,
    userDisplayName: string,
    message: string,
    badgeTier: number
): void {
    eventManager.triggerEvent("twitch", "bits-badge-unlocked", {
        userIdName: username,
        userId,
        username: userDisplayName,
        message,
        badgeTier
    });
}