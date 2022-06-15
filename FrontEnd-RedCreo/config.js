import getConfig from "next/config";

const {publicRuntimeConfig} =getConfig();

export const API = publicRuntimeConfig.PRODUCTION ? 'htttp://redcreo.com': 'http://192.168.1.76:4000';
export const APP_NAME = publicRuntimeConfig.APP_NAME;