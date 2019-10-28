export class User {
    public id: string;
    public firstName: string;
    public lastName: string;
    public fullName: string;
    public email: string;
    public profileImageUrl: string;

    public constructor(data?: any) {
        this.id = (data && data.id) ? data.id : null;
        this.firstName = (data && data.firstname) ? data.firstname : null;
        this.lastName = (data && data.surname) ? data.surname : null;
        this.fullName = `${this.firstName} ${this.lastName}`;
        this.email = (data && data.email) ? data.email : null;
        this.profileImageUrl = `http://wwwin.cisco.com/dir/photo/zoom/${this.id}.jpg`;
    }
}