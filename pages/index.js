import Head from "next/head";
import styles from "../styles/Home.module.css";
import React from "react";
import { NextSeo } from "next-seo";
import Moment from "react-moment";

export default function Home({ foggy, hot, date }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextSeo
        title={`El temps a Lleida`}
        description={`Hi ha boira? ${foggy}. Fa xafogor? ${hot}`}
      />

      <main className={styles.main}>
        <h1 className={styles.mainTitle}>El temps a Lleida</h1>
        <h2 className={styles.mainSubtitle}>
          Hi ha boira? <br />
          <span>{foggy}</span>
        </h2>
        <h2 className={styles.mainSubtitle}>
          Fa xafogor? <br />
          <span>{hot}</span>
        </h2>
        <p className={styles.mainFooter}>
          Última actualització:&nbsp;
          <Moment unix fromNow locale="ca">
            {date}
          </Moment>
        </p>
      </main>

      <footer className={styles.footer}>
        <p>
          Dades de{" "}
          <a href={"https://openweathermap.org/"} target={"blank"}>
            OpenWeather
          </a>{" "}
          per a{" "}
          <a
            href={
              "https://www.google.com/maps/place/41%C2%B037'00.1%22N+0%C2%B037'00.1%22E/@41.6167,0.614506,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x0!8m2!3d41.6167!4d0.6167"
            }
            target={"blank"}
          >
            Lleida, Catalunya
          </a>
          .<br />
          Creat per{" "}
          <a href={"https://jpagano.gitlab.io"} target={"blank"}>
            J.Pagano
          </a>
        </p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=41.6167&lon=0.6167&exclude=daily,hourly,minutely&units=metric&appid=${process.env.API_KEY}`
  );
  const weather = await res.json();
  const foggy =
    weather.current.weather[0].description === "fog" &&
    weather.current.weather[0].description === "mist"
      ? "Si"
      : "No";
  const hot = weather.current.feels_like >= 30 ? "Si" : "No";
  const date = weather.current.dt;

  return {
    props: {
      foggy,
      hot,
      date,
    },
  };
}
