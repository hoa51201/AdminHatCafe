/*
    Interface là để hứng dữ liệu từ api trả về
    File này hứng là hứng dữ liệu của User đăng nhập vào hệ thống
*/
export class LoginUser{
    constructor(
        access_token: string, 
        staff_id: string, 
        staff_email: string, 
        staff_name: string, 
        staff_image: string, 
        staff_address: string,
        staff_phone_number: string
        ) {
        this.access_token = access_token;
        this.staff_id = staff_id;
        this.staff_email = staff_email;
        this.staff_name = staff_name;
        this.staff_image = staff_image;
        this.staff_address = staff_address;
        this.staff_phone_number = staff_phone_number;
    }

    public access_token: string
    public staff_id: string;
    public staff_email: string;
    public staff_name: string;
    public staff_image: string;
    public staff_address: string;
    public staff_phone_number: string;
}