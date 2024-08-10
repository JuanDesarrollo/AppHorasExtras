import React from 'react';

const TooltipCell = ({ text, maxChars }) => {
    {/*  */ }
    const truncatedText =
        <a data-tooltip-id="my-tooltip" data-toggle="tooltip" data-placement="left" >
            {text}
        </a>
    return (
        <td className="tooltip-cell " data-toggle="tooltip" data-placement="left" title={text}>
            {truncatedText}
            <div className="tooltip-content">{text}</div>
        </td>
    );
}

export default TooltipCell;
