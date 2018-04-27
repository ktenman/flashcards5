import {BaseEntity} from './../../shared'

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public front?: string,
        public back?: any,
        public known?: boolean,
        public enabled?: boolean,
        public userLogin?: string,
        public userId?: number,
    ) {
        this.known = false;
        this.enabled = true;
    }
}
