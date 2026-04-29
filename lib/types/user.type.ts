export type UserItem = {
    _id: string;
    clerk_id: string;
    email: string;
    role: "user"|"admin";
}