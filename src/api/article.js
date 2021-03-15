/**
 *接口列表
 */
import base from './urlbase';
import axios from '@/request/http';
import qs from 'qs'; // 根据需求是否导入qs模块
import { Toast } from 'vant';//引入ui提示

let serverUrl=base.url;
if(process.env.NODE_ENV === 'production') {//线上环境
  axios.get('./url.txt').then(function(res){
    serverUrl=res.data;
  }).catch((error) => {
    console.error(error);
  });
}

const article={
  // sid:localStorage.getItem('sessionIds'),
  WXcode:{
    appid:'wxdcdecced6a431f91',
    sc:'6463a231a9c5b298d98b51927673385e',
  },
  tip(msg){
    Toast({
      message: msg,
      duration: 1000,
      forbidClick: true
    });
  },
  serverUrl:serverUrl,
  //获取当前是否存在
  getOpenIdUser(params){
    return axios.get(`${serverUrl}/api/User/getOpenIdUser?openId=${params.openId}&phone=${params.phone}`);
  },
  //添加用户
  addUser(params){
    return axios.post(`${serverUrl}/api/User/addUser`,params);
  },
  //更新用户
  updateUser(params){
    return axios.post(`${serverUrl}/api/User/updateUser`,params);
  },
  //获取反馈
  getFeedback(params){
    return axios.get(`${serverUrl}/api/Feedback/getFeedback?Programid=${params}`);
  },
  //添加反馈
  addFeedback(params){
    return axios.post(`${serverUrl}/api/Feedback/addFeedback`,params);
  },
  //图片上传
  upLoadImg(params){
    return axios.post(`${serverUrl}/api/Img/UpLoadImg`,params);
  },

  //公共页码
  fiterArr(num){
    let s=parseInt(num);
    if(s<=10){
      return [10] 
    }else if(s>10&&s<=20){
      return [10,20]
    }else if(s>20&&s<=50){
      return [10,20,50]
    }else if(s>50&&s<=100){
      return [10,20,50,100]
    }else if(s>100){
      return [10,20,50,100,200]
    }
  },
  //判断是否微信浏览器
  is_weixn(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
  },
  // 日期转换
  formateDate(datetime) {
      function addDateZero(num) {
          return (parseInt(num) < 10 ? "0" + num : num);
      }
      // 兼容性处理
      if(typeof datetime === 'string' && (datetime.indexOf('T') > -1||datetime.includes('T'))) {
          datetime = datetime.replace('T', ' ').replace(/\-/g, '/'); //注意：指定一个具体的时间转换时间戳，需要yyyy/mm/dd hh:ii:ss格式，yyyy-mm-dd在IE和Safari下是有问题的。
      };
      if(datetime==null||datetime==''){//时间错误的时候
          return ' ';
      }else{
          let d = new Date(datetime);
          // let formatdatetime = new Date(datetime.substr(0,parseInt(datetime.indexOf('.'))).replace(/-/g,"/").replace('T'," "));//转化兼容IE时间格式
          let formatdatetime = d.getFullYear() + '/' + addDateZero(d.getMonth() + 1) + '/' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
          return formatdatetime;
      }
  }
}

export default article;
