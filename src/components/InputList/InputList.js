import { Fragment, useRef } from "react";
import './InputList.css'

export default function InputList({ value, onChange, render , state }) {


    let push = (val) => {
        onChange([...value, val]);
    }

    let remove = (idx) => {
        let ret = [];
        for (let i = 0; i < value.length; i++)
            if (i === idx) continue;
            else ret.push(value[i]);
        onChange(ret);
    }

    let ref = useRef();


    return <>
        <div className=" d-flex justify-content-between ">
            
            {render(ref)}

            <div className="add-button btn btn-primary tajawal" onClick={() => {push(ref.current.value);ref.current.value = '';}}>
                اضف
            </div>
        </div>
        {
                state.invalid && (<div className="invalid-feedback d-block mb-2">{state.error.message}</div>)
        }
        <div className="list-wrapper mb-3">
            {
                value.map(
                    (item, idx) =>
                        <div key={idx} className="list-item d-flex justify-content-between align-items-center">
                            <span>{item}</span>
                            <div className="btn btn-danger" onClick={() => remove(idx)}><i className="bi bi-x-lg"></i></div>
                        </div>) 
            }
        </div>
    </>
}


