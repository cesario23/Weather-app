import React from 'react'

function showLocation(props) {
    return (
        <div>
        {
            props.locationArray.map((item) =>{
                return <div>
                    <span>{item.city}{item.country}</span>
                </div>
            })
        }
        </div>
    )
}

export default showLocation
