import React, { Component } from "react";
import CarbonAds from "react-carbon-ads";
import styles from "./ad-block.module.scss";

const AdBlock = () => {
  return (
    <div className={styles.adBlock}>
      <CarbonAds carbonUrl="//cdn.carbonads.com/carbon.js?serve=CE7D62J7&placement=css-irlinfo" />
    </div>
  );
};

export default AdBlock;
