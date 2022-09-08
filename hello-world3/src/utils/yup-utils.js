
import * as yup from 'yup';
import { setLocale } from 'yup';
//  自定义校验提示语
setLocale({
  mixed: {
    notType: ({path, originalValue, type}) => {
      if(type === 'number'){
        let name = ''
        switch(path){
          case 'age':
            name = '年龄';
            break;
          case 'angle':
            name = '角度'
            break;
        }
        if(originalValue === ''){ //  数字格式的非空
          return `${name}不能为空`
        }else{  //  数字格式的格式不正确
          return `${name}格式不正确`
        }
      }else if(type === 'date'){
        return '日期格式不正确'
      }
    },
  }
});
/**
 * @description: 自定义方法是否相等(数字和字符串)
 * @param {*} matchName 要对比的字段名
 * @param {*} errorMessage 错误后的提示信息
 * @return {*}
 */
yup.addMethod(yup.mixed, "isEqual", function (matchName, errorMessage) {
  return this.test(`test-name`, errorMessage, function (value) {
    const { path, parent,createError } = this;
    return parent[matchName] === value ? true : createError({ path, message: errorMessage });
  });
});
/**
 * @description: 自定义方法是否相等(日期)
 * @param {*} matchName 要对比的字段名
 * @param {*} errorMessage 错误后的提示信息
 * @return {*}
 */
yup.addMethod(yup.date, "isEqual", function (matchName, errorMessage) {
  return this.test(`test-name`, errorMessage, function (value) {
    const { path, parent,createError } = this;
    return new Date(parent[matchName]) === value ? true : createError({ path, message: errorMessage });
  });
});
/**
 * @description: 自定义方法是否为手机号
 * @param {*} errorMessage 错误后的提示信息
 * @return {*}
 */
yup.addMethod(yup.mixed, "isMobile", function (errorMessage) {
  return this.test(`test-name`, errorMessage, function (value) {
    const { path,createError } = this;
    const phoneReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/    
    return (phoneReg.test(value) || createError({ path, message: errorMessage }));
  });
});
/**
 * @description: 自定义方法是否为身份证号
 * @param {*} errorMessage 错误后的提示信息
 * @return {*}
 */
yup.addMethod(yup.mixed, "isChId", function (errorMessage) {
  return this.test(`test-name`, errorMessage, function (value) {
    const { path,createError } = this;
    const idReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/ 
    return (idReg.test(value) || createError({ path, message: errorMessage }));
  });
});

let _schema = yup.object().shape({  //  示例schema
  password: yup.string().required('请输入密码').min(4,'密码不能少于4位数').max(6,'密码不能大于6位数').oneOf(['11111','22222','33333'], '密码错误'),
  confirmPassword: yup.string().required('请输入确认密码').isEqual('password', '确认密码不正确'),
  phone: yup.mixed().required('请输入手机号吗').isMobile('手机号不正确'),  
  age: yup.number().min(18, '未成年误入').max(35, '你已超龄'),
  identification: yup.mixed().isChId('身份证号码有误'),
  email: yup.string().email('邮箱格式不正确'),
  website: yup.string().url('网址格式错误'),
  exactDay: yup.date(),
  birthday: yup.date().min(yup.ref('exactDay'), '日期必须在1992-01-02以后').max('2022-09-06','日期必须在2022-09-06以前'),
  partner: yup.string().oneOf(['tom','jacky','harry'], '不是合伙人')
});