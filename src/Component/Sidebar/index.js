import { type } from '@testing-library/user-event/dist/type';
import '../../App.css'

const Sidebar = ({ onDragStart }) => {
    // node Data using this Data we are Show nodes in sidebar
    const data = [
        {
            lable: "Node",
            type: "rectangle",
            class: "rectengle",
        },
        {
            lable: "Conditional",
            type: "conditional",
            class: "conditional",
        },
        {
            lable: "Iteration",
            type: "iteration",
            class: "iteration",
        },
    ]
    return(
        <div style={{ width: '92%' }}>
            {
                data.map((val,i) =>{
                    return(
                        //call onDragStart Event and Using this Event we are Add nodes in Canvas
                        <div draggable onDragStart={(e) => onDragStart(e, val.type)}
                        className="cursor-pointer nodes">
                        <div className={val.class}>{val.lable}</div>
                    </div>
                    )
                })
            }
    </div>
    )
};

export default Sidebar