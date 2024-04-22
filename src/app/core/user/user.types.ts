export interface User
{
DEFAULT_STATUS: any;
DEFAULT_AVATAR: any;
    lastName: string;
    firstName: string;
    email: string;
    avatar?: string;
    password?: string;
    status : string 
}
export const DEFAULT_AVATAR = 'src/assets/images/avatars/female-01.jpg';
export const DEFAULT_STATUS = 'active';
