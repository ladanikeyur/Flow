import { type } from '@testing-library/user-event/dist/type';
import '../../App.css'

const Sidebar = ({ onDragStart }) => {
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