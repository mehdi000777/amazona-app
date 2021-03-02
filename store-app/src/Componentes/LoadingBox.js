import React from 'react'

export default function LoadingBox({ small }) {
    return (
        <div className={`center row ${small ? "small" : "large"}-Loading`}>
            <i class="fas fa-spinner fa-spin"></i>
        </div>
    )
}
