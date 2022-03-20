import { signIn, useSession } from "next-auth/react";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceID: string;
}

export default function SubscribeButton({ priceID: SubscribeButtonProps }) {
  const { data: session } = useSession();

  function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }
  }

  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
}
