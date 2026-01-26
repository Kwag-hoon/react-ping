import { useState } from "react";
import arrow from "../../assets/icon-chevron-down.svg";
function Select({ options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  return (
    <div className="custom-select" onClick={() => setOpen(!open)}>
      <div className="selected">
        {selected || placeholder}
      </div>

      <div className="arrow">
        <img
        src={arrow} alt="arrow" className="select_arrow"
      />
      </div>

      {open && (
        <ul className="options">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
                onchange?.(opt);  
                setOpen(false);
              }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Select;