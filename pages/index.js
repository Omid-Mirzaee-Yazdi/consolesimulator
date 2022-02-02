import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { initial, welcome } from "../conf/conf";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [lines, setlines] = useState([welcome]);
  const [running, setrunning] = useState(true);
  const [commandvalue, setcommandvalue] = useState(false);
  useEffect(() => {
    setcommandvalue(initial);
  }, [running]);
  useEffect(() => {
    setrunning(false);
  }, []);
  const commandinpchange = (e) => {
    if (e.target.value.substr(0, initial.length) === initial) {
      setcommandvalue(e.target.value);
    }
  };

  const onEnterPress = (e) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      setlines((prev) => [...prev, e.target.value]);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Console Simulator</title>
        <meta
          name="description"
          content="Created for educational purposes By Omid Mirzaee Yazdi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {lines?.map((line, index) => (
          <p key={index} className={styles.command}>
            {line}
          </p>
        ))}
        {!running && (
          <textarea
            value={commandvalue}
            onChange={commandinpchange}
            className={styles.commandinput}
            onKeyDown={onEnterPress}
          ></textarea>
        )}
      </main>
    </div>
  );
}
