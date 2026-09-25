import Card from "./Card";
import styles from "./StatCard.module.scss";

export default function StatCard({
  title,
  value,
  iconTone = "info"
}: {
  title: string;
  value: string | number;
  iconTone?: "info" | "warning" | "danger" | "success";
}) {
  return (
    <Card className={styles.stat}>
      <div className={styles.top}>
        <div className={styles.title}>{title}</div>
        <div className={`${styles.icon} ${styles[iconTone]}`} />
      </div>
      <div className={styles.value}>{value}</div>
    </Card>
  );
}
