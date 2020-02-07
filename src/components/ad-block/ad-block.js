import React from "react";
import styles from "./ad-block.module.scss";

export default ({ dangerouslySetInnerHTML }) => {
  return (
    <div className={styles.adBlock}>
      <div
        dangerouslySetInnerHTML={{
          __html: `<script
                async
                type="text/javascript"
                src="//cdn.carbonads.com/carbon.js?serve=CE7D62J7&placement=css-irlinfo"
                id="_carbonads_js"
              ></script>`
        }}
      />
    </div>
  );
};
