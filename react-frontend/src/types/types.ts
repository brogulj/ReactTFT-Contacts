export type Contact = {
    id: string;
    name: string;
    surname: string;
    favourite: boolean;
    gender?: Gender;
    birthdate?: string;
    email?: string;
    phone?: string;
    pager?: string;
    landline?: string;
    address?: string;
};

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
}
