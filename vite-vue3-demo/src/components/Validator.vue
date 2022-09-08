<template>
  <div>
    表单验证
  </div>
</template>
<script setup>
// 引入插件
import * as Validator from 'validatorjs';
//  引入语言文件
import zh from 'validatorjs/src/lang/zh';
//  设置语言
Validator.useLang('zh');
//  设置错误提示信息为插件自带的语言提示
// Validator.setMessages('zh', zh);
//  自定义错误信息提示
Validator.setMessages('zh', {
  required: ':attribute 是个什么玩意，重写'
})
//  新建实例
let validation = new Validator({
  name: '',
  age: undefined,
  sex: undefined,
  emails: '12'
}, {
  name: 'required',
});
//  设置自定义属性名
validation.setAttributeNames({ 
  url: '地址',
  email: '邮箱',
  name: '姓名'
  });
//  校验
validation.passes();
validation.fails();
//  获取email字段的第一个报错信息
validation.errors.first('email');
//  获取email字段所有的报错信息
validation.errors.get('email');
/* 可用规则
  required: 必填项
  required_if:anotherfield,value: 如果anotherfield字段等于value值时，该校验字段不能为空
  required_unless:anotherfield,value: 如果anotherfield字段等于value值时，该校验字段可以为空
  email: 邮箱格式
  size:[number] 长度需要等于number
  min:[number]  如果字段是数字类型，则数值不能小于number, 如果是字符串类型，则长度不能小于number
  max:[number]  如果字段是数字类型，则数值不能大于number, 如果是字符串类型，则长度不能大于number
  accepted: 字段必须是'yes','on', 1,'1',true
  date: 字段必须是日期格式
  after:[date]: 字段必须在date字段之后
  after_or_equal:[date]:  字段必须等于或者大于date
  before: [date]: 字段必须在date字段之前
  before_or_equal:[date]:  字段必须等于或者小于date
  alpha:  字段只能包含字母
  alpha_dash: 字段只能是字母、数字、下划线、破折号
  alpha_num:  字段只能是字母、数字
  array:  字段值要数组格式
  between:[min],[max]:  字段的数值或者长度需要在min和max之间
  boolean:  字段数值必须是true,false,0,1,'true','false','0','1'之间的值
  confirmed:  必须有一个和这个字段匹配的confirm字段，匹配字段的名称格式为[field]_confirmation
  digits:value: 必须是小数，切长度为value，长度包括小数点
  digits_between:min, max:  必须是长度介于min和max之间的小数
  integer:  数值必须是整数
  numeric:  数值必须是数字类型
  different:field:  该字段的值必须和field的值不同
  hex:  字段值必须符合16进制格式，用于校验颜色
  in:value1,value2,...:  字段值必须包含value里面的值
  not_in:value1,value2,...:  字段值必须不包含value里面的值
  present:  字段的值不能是undefined 
  same:attribute: 该字段和attribute字段相同
  string: 改字段为字符串类型
  url:  必须是URL格式的数据
  regex:/pattern/:  必须匹配pattern正则/pattern/
*/
console.log(validation.errors.first('name'))
</script>
<style>
</style>