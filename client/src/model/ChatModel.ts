import { Job } from "./jobModel";
import { Message } from "./messageModel";
import { User } from "./userModel";

export interface Chat {
    _id: string,
    job: Job,
    user: User,
  messages: Message[], 
  lastUpdated: Date
}

