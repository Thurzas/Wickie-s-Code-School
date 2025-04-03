import { useState } from "react";
import style from "./ToggleSwitch.module.css";
const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked); // Inverse l'état de la checkbox
  };

  return (
    <label className={style.switch}>
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className={style.slider} />
    </label>
  );
};

export default ToggleSwitch;
