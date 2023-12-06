import eventManager from "../../events/EventManager";

export function triggerRaid(
    username: string,
    userId: string,
    userDisplayName: string,
    viewerCount: number = 0
): void {
    eventManager.triggerEvent("twitch", "raid", {
        username: userDisplayName,
        userIdName: username,
        userId,
        viewerCount
    });
};