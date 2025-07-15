import React from 'react'

export default function Editnodes(props) {
    return (
        <div style={{ width: '92%' }}>
            <h2 className="text-lg font-bold mb-2">Edit Node</h2>
            <div className="inputmain">
                <label className="block text-sm">Name</label>
                <input
                    type="text"
                    className="inputtype"
                    value={props.popoverData.name}
                    onChange={(e) => props.setPopoverData({ ...props.popoverData, name: e.target.value })}
                />
            </div>
            <div className="inputmain">
                <label className="block text-sm">Color</label>
                <br />
                <input
                    type="color"
                    className="colorinput"
                    value={props.popoverData.color}
                    onChange={(e) => props.setPopoverData({ ...props.popoverData, color: e.target.value })}
                />
            </div>
            <div className="inputmain">
                <label className="block text-sm">Height</label>
                <input
                    type="number"
                    className="inputtype"
                    value={props.popoverData.height}
                    onChange={(e) => props.setPopoverData({ ...props.popoverData, height: e.target.value })}
                />
            </div>
            <div className="inputmain">
                <label className="block text-sm">Width</label>
                <input
                    type="number"
                    className="inputtype"
                    value={props.popoverData.width}
                    onChange={(e) => props.setPopoverData({ ...props.popoverData, width: e.target.value })}
                />
            </div>
            <button className="button-style" onClick={props.handleSubmit}>
                Submit
            </button>
        </div>
    )
}
