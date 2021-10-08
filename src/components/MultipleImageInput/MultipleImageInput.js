import { useRef } from "react";

import './MultipleImageInput.css'

export default function MultipleImageInput({ value, onChange, onBlur,state }) {
    let ref = useRef();
    let remove = (idx) => {

        let ret = [];
        for (let i = 0; i < value.length; i++)
            if (i === idx) continue;
            else ret.push(value[i]);
        onChange(ret);
    }

    return <div className={`card mb-3  ${state.invalid ? " border-1 border-danger" : ""}`}>
        <div className="card-body d-flex align-items-center flex-wrap">
            {
                value.map(val => URL.createObjectURL(val)).map((val, idx) => {
                    return <div key={idx} className="position-relative">
                        <div type="button" className="clear-button " onClick={() => remove(idx)}>
                            <i className="bi bi-x x-icon"></i>
                        </div>
                        <img src={val} alt="404" className="upload-image-preview ms-2 my-1" />
                    </div>

                })
            }

            <input hidden type="file" ref={ref} accept="image/*"
                onChange={(e) => {
                    onChange([...value, e.target.files[0]]);
                }}
                onBlur={onBlur}
            />

            <div className="fake-image" type="button" onClick={() => ref.current.click()}>+</div>
        </div>

        <div className="card-footer p-3">صور للمشروع</div>
        {
            state.invalid && (<div className="invalid-feedback d-block p-2">{state.error.message}</div>)
        }
    </div>
}
