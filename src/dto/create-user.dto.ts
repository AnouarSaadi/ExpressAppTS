export interface CreateUserDto {
    email?: string;
    verified?: boolean;
    name?: string;
    familyName?: string;
    givenName?: string;
    photo?: string;
}