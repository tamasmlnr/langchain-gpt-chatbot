import humanIcon from "../assets/Icons/human.svg";
import robotIcon from "../assets/Icons/robot.svg";
import styles from "./Icon.module.css";

interface IconProps {
  source: string;
  size?: string;
}

const Icon = ({ source, size = "50px" }: IconProps) => {
  return (
    <div className={styles.icon}>
      <img src={source} width={size} height={size} />
    </div>
  );
};

export default Icon;
