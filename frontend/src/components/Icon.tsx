import humanIcon from "../assets/Icons/human.svg";
import robotIcon from "../assets/Icons/robot.svg";
import styles from "./Icon.module.css";

interface IconProps {
  sender: "user" | "assistant";
}

const Icon = ({ sender }: IconProps) => {
  return (
    <div className={styles.icon}>
      {sender === "user" ? (
        <img src={humanIcon} alt="User Icon" width="30vw" height="30vw" />
      ) : (
        <img src={robotIcon} alt="Assistant Icon" width="30vw" height="30vw" />
      )}
    </div>
  );
};

export default Icon;
