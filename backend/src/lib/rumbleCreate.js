function getPurmutations(str){
    if(str.length <=1) return [str];
    let result=[];
    for(let i=0;i<str.length;i++){
        let current=str[i];
        let remaining=str.slice(0,i)+str.slice(i+1);
        let remainingPermutaions=getPurmutations(remaining);
    for(let perm of remainingPermutaions){result.push(current+perm)};

    }
return [...new Set(result)]
};

module.exports=getPurmutations