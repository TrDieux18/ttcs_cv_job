// Hàm lấy cookie
export function getCookie(cname) {
   var name = cname + "=";
   var ca = document.cookie.split(";");
   for (let i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
         c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
         return c.substring(name.length, c.length);
      }
   }

   return "";
}

//Hàm tạo cookie
export function setCookie(cname, cvalue, exdays) {
   var d = new Date();
   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
   var expries = "expires=" + d.toUTCString();
   document.cookie = cname + "=" + cvalue + "; " + expries;
}

//Hàm tạo delete
export function deleteCookie(cname) {
   document.cookie = cname + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
}

export function deleteAllCookies() {
   const cookies = document.cookie.split(";");
   const path = window.location.pathname.split("/")[1];
   for (let cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();

      // xóa với path gốc
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;

      // xóa thêm với path Project...
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${path}`;
   }
}
