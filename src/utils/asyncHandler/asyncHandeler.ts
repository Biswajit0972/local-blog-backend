
export const asyncHandeler =  (fn:any) => {
    try  {
       return async (req:any, res:any) => {
           await fn(req, res);
       }
    }catch (err) {

    }
}