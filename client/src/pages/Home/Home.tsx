import { Github, Linkedin } from "lucide-react";
import PersonCard from "../../components/Person/PersonCard";
import SimpleDamagedPaper from "../../components/Wanted/SimpleDamagedPaper";
import Wanted from "../../components/Wanted/Wanted";
import style from "./Home.module.css";
const Home = () => {
  return (
    <>
      <section className={style.joinTheCrew}>
        <button type="button"> Nous rejoindre</button>
      </section>
      <section className={style.about}>
        <h2>à Propos de moi :</h2>
        <article className={style.about}>
          <div className={style.content}>
            <Wanted>
              <PersonCard
                data={{
                  id: 1,
                  firstname: "Matt",
                  lastname: "Miot",
                  pseudo: "Thurzas",
                  image: "/assets/images/Thurzas.png",
                  age: 35,
                  privillege: "odin",
                  level: 99,
                  xp: 99999999,
                }}
              />
              <p>
                {" "}
                recherché pour recelle de site web sur le net, ne tentez pas
                d'arrêter cet individu vous même. je répête
              </p>
              <h2> N'éssayez surtout pas d'arrêter cet individu vous même !</h2>
            </Wanted>
            <SimpleDamagedPaper>
              <Github width={150} height={150} />
              <Linkedin width={150} height={150} />
            </SimpleDamagedPaper>
          </div>
        </article>
      </section>
    </>
  );
};

export default Home;
