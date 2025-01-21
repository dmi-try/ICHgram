import styles from "./NotFoundPage.module.css";
import banner from "../../assets/images/main_banner_image.jpg";

function NotFoundPage() {
  return (
    <section className={styles.not_found_container}>
      <div className={styles.content_container}>
        <picture>
          <img src={banner} alt="" />
        </picture>
        <div className={styles.not_found_text_content}>
          <h1>
            Oops! Page Not Found
            <br />
            (404 Error)
          </h1>
          <p className={styles.not_found_text}>
            We're sorry, but the page you're looking for doesn't seem to exist.
            <br /> If you typed the URL manually, please double-check the
            spelling. <br /> If you clicked on a link, it may be outdated or
            broken.
          </p>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
