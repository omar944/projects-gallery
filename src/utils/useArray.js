import { useState } from "react";

export default function useArray()
{
    let [array , update] = useState([]);

    const push = (item) => {
        update(old=>[...array,item]);
    }

    const remove=(idx)=>
    {
        update((old) => {
            let ret = [];
            for(var i = 0 ; i < array.length ; i++)
                if(i === idx)
                    continue;
                else
                    ret.push(array[i]);
            return ret;
        });
    }

    return {array,push,remove};
}