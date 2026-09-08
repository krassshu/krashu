import english from './en.json';
export type Locale = 'pl' | 'en';
const dictionary: Record<string,string> = english;
/** Translate presentation text on the server; preserve non-text React children. */
export function t<T>(value:T,locale:Locale):T {
 if(locale==='pl'||typeof value!=='string')return value;
 const key=value.replace(/\s+/g,' ').trim();
 const translated=dictionary[key];
 if(!translated)return value;
 return `${/^\s/.test(value)?' ':''}${translated}${/\s$/.test(value)?' ':''}` as T;
}
export function localHref(path:string,locale:Locale):string {
 if(locale==='pl'||!path.startsWith('/')||path.startsWith('/en/'))return path;
 return `/en${path}`;
}
