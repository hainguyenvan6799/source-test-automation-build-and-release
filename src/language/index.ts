/*
* @kintone-plugins/bulk-update-status
* Copyright (c) 2021 Cybozu
*
* Licensed under the MIT License
*/
import ja from './ja';
import en from './en';
import zh from './zh';

const lang = kintone.getLoginUser().language;
const locales = {en, ja, zh};
export default locales[lang] || locales.en;
