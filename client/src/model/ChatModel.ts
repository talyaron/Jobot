import { Message } from "./messageModel";

export interface Chat {
    currentUserId: string,
    otherUserId: string,
    messages: Message[], 
    lastUpdated: Date,
}

