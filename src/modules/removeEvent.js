import { handleMenuClick } from "./events";

export const removeMenuEvent = () => {
  const menuBtn = document.querySelector("#menu-btn");

  menuBtn.removeEventListener("click", handleMenuClick);
};
