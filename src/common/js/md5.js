import MD5 from 'js-md5'

let getsign=function getsign(params,fn,six) {
  let key='dd4669c9cd4ac9ac4b2738c19bbd9646';
  let  str='';
  str+=key;
  for(let i in params){
    if(params[i]!=='' &&  i !='sign'){
     str+=(i+params[i]);
    }

  }
  console.info('字符串',str.toLocaleLowerCase()+fn.toLocaleLowerCase());
  return MD5(MD5(str+fn.toLocaleLowerCase())+six)
};
export default getsign

