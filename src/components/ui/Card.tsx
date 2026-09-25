import styles from "./Card.module.scss";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Card({ children, className, ...rest }: Props) {
  return (
    <div className={`${styles.card} ${className ?? ""}`} {...rest}>
      {children}
    </div>
  );
}
