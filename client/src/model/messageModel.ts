export interface Message {
    _id?: string;
    userId: string;
    jobId?: string;
    content: string;
    sentAt: Date;
    isRead: boolean;
  }