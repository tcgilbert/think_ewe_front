import React, { useState } from 'react'
import NavTabs from './material-ui/NavTabs'


const DynamicContent = () => {

    const [shownContent, setShownContent] = useState("feed")

    return (
        <div className="dynamic-content">
            <NavTabs />
        </div>
    )
}

export default DynamicContent
