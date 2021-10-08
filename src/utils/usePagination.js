import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";


export default function usePagination(fetchFunction)
{
    let [cursor , setCursor] = useState(0);
    let [isLoading , setLoading] = useState(false);
    let [isError , setErrorState] = useState(false);
    let [curPageData , updateCurPage] = useState();

    const fetcher = async ()=>
    {
        if(isLoading)
            return ;
        setErrorState(false);
        setLoading(true);
        try
        {
            let res = await fetchFunction(cursor);
            updateCurPage(res.data);

        }catch
        {
            setErrorState(true);
        }
        finally{
            setLoading(false);
        }
    }


    useEffect(()=>{
        fetcher();
    },[]);


    





    
}