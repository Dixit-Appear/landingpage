import React from 'react';

export default ({ handleChange, label, type, ...props }) => {
    return (
        <div>
            {
                label &&
                <label htmlFor={props.id || props.name}>{label}</label>
            }
            <input type={type} className="form-input" onChange={handleChange} />
        </div>
    )

}