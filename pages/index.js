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
  const commandInpChange = (e) => {
    if (e.target.value.substr(0, initial.length) === initial) {
      setcommandvalue(e.target.value);
    }
  };
  const sendCommand = async (e) => {
    if (e.keyCode == 13) {
      setrunning(true);
      e.preventDefault();
      setlines((prev) => [...prev, e.target.value]);
      const command = e.target.value.substr(initial.length).trim();
      setcommandvalue(initial);
      const fetchCommands = await fetch("./api/commands");
      const fetchCommandsJson = await fetchCommands.json();
      const filteredjson = await fetchCommandsJson.filter(
        (item) => item.command === command
      );
      console.log(filteredjson);
      if (filteredjson.length > 0) {
        filteredjson.function;
      } else {
        setlines((prev) => [...prev, command + " was not found!"]);
      }
      setrunning(false);
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
            spellCheck="false"
            value={commandvalue}
            onChange={commandInpChange}
            className={styles.commandinput}
            onKeyDown={sendCommand}
          ></textarea>
        )}
      </main>
    </div>
  );
}
