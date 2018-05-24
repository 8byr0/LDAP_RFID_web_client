export interface iGroupProvider{
    name?: string
    uid?: string
    givenName?: string
    phoneNumber?: string
    mail?: string
    mobile?: string
    zipCode?: string
    thumbnail?: string
    city?: string
    sn?: string
    cn?: string
    fromDB?: boolean
}

export class Group{
    public name: string
    public city: string
    public uid: string
    public sn: string
    public thumbnail: string
    public givenName: string
    public phoneNumber: string
    public mail: string
    public mobile: string
    public zipCode: string
    public cn : string
    public fromDB: boolean

    constructor(params: iGroupProvider){
        this.fromDB = params.fromDB
        this.sn = params.sn;
        this.cn = params.cn;
        this.name = params.name;
        this.uid = params.uid
        this.city = params.city
        this.givenName = params.givenName
        this.thumbnail = params.thumbnail
        this.phoneNumber = params.phoneNumber
        this.mail = params.mail
        this.mobile = params.mobile
        this.zipCode = params.zipCode
    }
}