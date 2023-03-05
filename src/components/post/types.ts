export interface PostItem {
    id: string;
    userId: string;
    username: string;
    avatarUrl: string;
    date: string;
    header: string;
    detail?: string;
    status: PostStatus;
    topicName?: string;
    topicSlug?: string;
}


export enum PostStatus {
    Draft = "draft",
    Published = "published"
}