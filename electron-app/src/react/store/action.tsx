export const update = (target:string , value:number | string) => {
    return { type:'UPDATE', target, value};
};