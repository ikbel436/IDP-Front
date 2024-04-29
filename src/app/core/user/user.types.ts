export interface User
{

name: string
    lastName: string;
    firstName: string;
    email: string;
    avatar?: string;
    password?: string;
    status : string 
}
export const DEFAULT_AVATAR = 'src/assets/images/avatars/female-01.jpg';
