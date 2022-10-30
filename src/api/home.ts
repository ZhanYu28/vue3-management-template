import request from '@/api/request'

// 获取天气信息
// 使用的天气接口及参数 https://www.tianqiapi.com/index/doc?version=v61
export const reqGetWeather = (cityid:number)=> request({url:`https://v0.yiketianqi.com/free/day?appid=18926344&appsecret=UNV2vAUD&unescape=1&cityid=${cityid}`,method:'get'})

// 获取github提交信息
export const reqGithubCommit = (repository:string)=> request({url:`https://api.github.com/repos/${repository}/commits`,method:'get'});

// 获取gitee提交信息
export const reqGiteeCommit = (repository:string)=> request({url:`https://gitee.com/api/v5/repos/${repository}/commits`,method:'get'});
