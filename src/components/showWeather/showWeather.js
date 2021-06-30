import React from 'react'

function showWeather(props) {
    return (
        <div>
            {
                props.haveInfo === false ? (<div> 
                    Search Something! </div>) : (
                        <>
                        <div>
                            Current Weather: {props.targetName}, {props.targetCountry}
                        </div>
                        <div>
                            Temperature:  {props.info.temp}
                            <br />
                            Feels like: {props.info.feels_like}
                            <br />
                            Lowest: {props.info.temp_min}
                            <br />
                        </div>
                        </>
                    )
            }
            
        </div>
    )
}

export default showWeather
