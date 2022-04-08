import React from "react";
const Notification = ({ message }) => {
    const notifStyle= {
        color:'red',
        fontStyle : 'italic',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        marginBottom: 15
    }
    if (message === null) {
        return null
    }

    return (
        <div style={notifStyle}>
            {message}
        </div>
    )
}
export default Notification