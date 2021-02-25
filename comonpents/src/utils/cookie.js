/**
 * @author v4 <lucky6616888@163.com>
 * Created by v4 on 2020-04-01 14:00
 */

const token = 'token';

/**
 * 获取 cookie domain
 */
export const GetCookieDomain = () => {
  let host = window.location.hostname;
  let ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  if (ip.test(host) === true || host === 'localhost') return host;
  let regex = /([^]*).*/;
  let match = host.match(regex);
  if (typeof match !== "undefined" && null !== match) host = match[1];
  if (typeof host !== "undefined" && null !== host) {
    let strAry = host.split(".");
    if (strAry.length > 1) {
      host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
    }
  }
  return '.' + host;
};

/**
 * 设置 Token
 */
export const setToken = (val, time) => {
  setCookie(token, val, time);

};

export const getToken = () => {
  return getCookie(token);
};

/**
 * 清除 Token
 */
export const clearToken = () => {
  delCookie(token);
};

/**
 * 时间计算
 */
export const getSec = (str) => {
  let str1 = str.substring(1, str.length) * 1;
  let str2 = str.substring(0, 1);
  if (str2 === "s") {
    return str1 * 1000;
  } else if (str2 === 'm') {
    return str1 * 60 * 1000;
  } else if (str2 === "h") {
    return str1 * 60 * 60 * 1000;
  } else if (str2 === "d") {
    return str1 * 24 * 60 * 60 * 1000;
  }
};

/**
 * 设置 cookie
 */
export const setCookie = (name, value, time = 'm30') => {
  let strsec = getSec(time);
  let exp = new Date();
  exp.setTime(exp.getTime() + strsec * 1);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "domain=" + GetCookieDomain() + "; path=/";

};

/**
 * 获取 cookie
 */
export const getCookie = (name) => {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr === document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
};

/**
 * 删除 cookie
 */
export const delCookie = (name) => {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let val = getCookie(name);
  if (val !== null) {
    document.cookie = name + "=" + val + ";expires=" + exp.toGMTString();
  }
};

/**
 * 清除 cookie
 */
export const clearCookie = () => {
  let keys = document.cookie.match(/[^=;]+(?=\/=)/g);
  if (keys) {
    for (let i = keys.length; i--;) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
    }
  }
};
