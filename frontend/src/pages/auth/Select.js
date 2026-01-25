import { useState } from "react";

function Select({ options, placeholder }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  return (
    <div className="custom-select" onClick={() => setOpen(!open)}>
      <div className="selected">
        {selected || placeholder}
      </div>

      <div className="arrow">▼</div>

      {open && (
        <ul className="options">
          {options.map((opt) => (
            <li
              key={opt}
              onClick={() => {
                setSelected(opt);
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
