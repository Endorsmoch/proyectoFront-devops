import * as CryptoJS from 'crypto-js';

export class Crypto {
    private key = '23Sr3YuUc4ttANnSsIs3g';
    
    public encrypted(text: string): string {
        return CryptoJS.AES.encrypt(text, this.key).toString();
    }

    public decrypted(text: string): string {
        return (CryptoJS.AES.decrypt(text, this.key)).toString(CryptoJS.enc.Utf8);;
    }
}