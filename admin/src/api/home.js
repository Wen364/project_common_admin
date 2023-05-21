import request from "@/utils/request";

export const reqFirstPageData = () => request({method:'get',url:'/home/getData'})