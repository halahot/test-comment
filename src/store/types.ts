import { Dayjs } from "dayjs";

export type Comment = {
    id: string;
    author: string;
    email: string;
    date: Dayjs;
    text: string;
    rating: number;
    isHidden: boolean;
}