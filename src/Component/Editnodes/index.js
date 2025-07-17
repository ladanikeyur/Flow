import React from 'react'

export default function Editnodes(props) {
    return (
        //Create Edit node Function
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
            <div>
                <select 
                value={props.popoverData.typeid}
                onChange={(e) => props.setPopoverData({ ...props.popoverData, typeid: e.target.value })}
                >
                    <option value="rectangle">Nodes</option>
                    <option value="conditional">Condisnal</option>
                    <option value="iteration">Iteretion</option>
                </select>
            </div>
            {/* using this submit button we are Edit Node data  */}
            <button className="button-style" onClick={props.handleSubmit}>
                Submit
            </button>
        </div>
    )
}
