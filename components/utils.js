import cryptoJs from "crypto-js";

export class CustomCounter
{
    constructor(timer,repetitionLimit,callBackFunc)
    {
        this.startEffect=false;
        this.repetition = 0;
        this.repetitionLimit = repetitionLimit
        this.initialTimer = timer;
        this.timer=timer;
        this.callBackFunc = callBackFunc;
        this.animationContainer = null
    }
    start = ()=>
    {
        
        this.timer --;
        if(this.timer == 0)
        {
            this.repetition ++;
            this.timer = this.initialTimer;
            this.callBackFunc();
            if(this.repetition<this.repetitionLimit)
            {
                this.animationContainer =  window.requestAnimationFrame(this.start)
            }
           
           
        }
        else
        {
            this.animationContainer =  window.requestAnimationFrame(this.start)
            
        }

        
    }
    cancelCounter()
    {
        window.cancelAnimationFrame(this.animationContainer)
    }
}

//UTIL

export function getCookieFunc(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return 'empty';
  }
  export function setCookieFunc(name, value, expirationDays) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }
  
  export function deleteCookie(_name) {
    document.cookie = _name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
  
  
//   export function checkLogin(callBack)
//   {
//     let userUid = getCookieFunc('uid');
   
//     if(userUid != 'empty')
//     { 
      
//        db_getUserInfo(userUid,callBack);
//     }
//     else
//     {
//       callBack(false);
//     }
//   }
  
  
  export function encryptData(_dataToEncrypt)
  {
              const secretKey = "dwarrior1503";
  
              // Chiffrer la valeur du niveau
              
              const encryptedSave = cryptoJs.AES.encrypt(_dataToEncrypt, secretKey).toString();
              
              setCookieFunc('DW_SAVE',encryptedSave,5)
  
              
  }
  
  export function decryptData(_encryptedData)
  {
              const secretKey = "dwarrior1503";
  
              // Déchiffrer la valeur du niveau
              const decryptedLevel = cryptoJs.AES.decrypt(_encryptedData, secretKey).toString(cryptoJs.enc.Utf8);
              return decryptedLevel;
  }