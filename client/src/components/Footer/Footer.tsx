import { Facebook, Github, Instagram } from "lucide-react";
import { Link } from "react-router";
import Style from "./Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={Style.FooterContainer}>
        <section>
          <div className={Style.rights}>
            <p>© 2025 Wickie's Code School. Tous droits réservés.</p>
          </div>
          <div className={Style.icons}>
            <Link to="/">
              <Instagram className={Style.FooterSVG} />
            </Link>
            <Link to="/">
              <Facebook className={Style.FooterSVG} />
            </Link>
            <Link to="/">
              <Github className={Style.FooterSVG} />
            </Link>
          </div>
        </section>
      </footer>
    </>
  );
};
export default Footer;
