import { FirebotChatMessage } from "../../../types/chat";
import frontendCommunicator from "../../common/frontend-communicator";
import eventManager from "../EventManager";

export function triggerChatMessage(firebotChatMessage: FirebotChatMessage): void {
    eventManager.triggerEvent("twitch", "chat-message", {
        userId: firebotChatMessage.userId,
        userIdName: firebotChatMessage.userIdName,
        username: firebotChatMessage.username,
        twitchUserRoles: firebotChatMessage.roles,
        messageText: firebotChatMessage.rawText,
        chatMessage: firebotChatMessage
    });
}

export function triggerFirstTimeChat(firebotChatMessage: FirebotChatMessage): void {
    eventManager.triggerEvent("twitch", "first-time-chat", {
        userId: firebotChatMessage.userId,
        userIdName: firebotChatMessage.userIdName,
        username: firebotChatMessage.username,
        twitchUserRoles: firebotChatMessage.roles,
        messageText: firebotChatMessage.rawText,
        chatMessage: firebotChatMessage
    });
}

export function triggerChatMessageDeleted(messageId: string) {
    frontendCommunicator.send("twitch:chat:message:deleted", messageId);
}

export function triggerChatCleared(
    username: string,
    userId: string,
    userDisplayName: string
) {
    eventManager.triggerEvent("twitch", "chat-cleared", {
        moderator: username,
        moderatorId: userId,
        moderatorDisplayName: userDisplayName
    });

    frontendCommunicator.send("twitch:chat:clear-feed", username);
}

export function triggerChatModeChanged(
    chatMode: string,
    chatModeState: "disabled" | "enabled",
    moderator: string,
    duration?: number
): void {
    eventManager.triggerEvent("twitch", "chat-mode-changed", {
        chatMode,
        chatModeState,
        moderator,
        duration
    });
}