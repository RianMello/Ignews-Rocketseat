import { GetStaticProps } from "next";
import Head from "next/head";
import SubscribeButton from "../components/SubscibeButton";
import { stripe } from "../services/stripe";
import styles from "./home.module.scss";

interface HomeProps {
  product: {
    priceID: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  console.log();
  return (
    <>
      <Head>
        <title>Ignews-Home</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News abount the <span>React</span> world
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for {product.amount} month</span>
          </p>

          <SubscribeButton priceID={product.priceID} />
        </section>
        <img src="/img/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve("price_1Kcd5cAyAS1t2DZx6ZZcYCfO");

  const product = {
    priceID: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 horas
  };
};
