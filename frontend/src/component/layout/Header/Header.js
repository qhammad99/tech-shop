import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo/logo-no_bg-purple.png";
import { BsPersonCircle, BsSearch, BsCart4 } from "react-icons/bs";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#7E54A9"
      burgerColorHover="#7E54A9"
      logo={logo}
      logoWidth="20vmax"
      navColor1="white"
      logoHoverColor="#1a0035"
      link1Text="Home"
      link2Text="Product"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/product"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.7vmax"
      link1Color="#471F71"
      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#1a0035"
      link1Margin="1vmax"
      profileIconUrl="/login"
      profileIconColor="#471F71"
      searchIconColor="#471F71"
      cartIconColor="#471F71"
      profileIconColorHover="#1a0035"
      searchIconColorHover="#1a0035"
      cartIconColorHover="#1a0035"
      cartIconMargin="2vmax"
      profileIcon={true}
      searchIcon={true}
      cartIcon={true}
      ProfileIconElement={BsPersonCircle}
      SearchIconElement={BsSearch}
      CartIconElement={BsCart4}
      nav1Transition="0"
      nav2Transition="0"
      nav3Transition="0"
      nav4Transition="0"
      link1Transition="0.2"
      link2Transition="0.2"
      link3Transition="0.2"
      link4Transition="0.2"
      link1AnimationTime="0.1"
      link2AnimationTime="0.2"
      link3AnimationTime="0.2"
      link4AnimationTime="0.2"
      logoTransition="0.2"
      logoAnimationTime="0.2"
      searchIconAnimationTime="0.2"
      cartIconAnimationTime="0.2"
      profileIconAnimationTime="0.2"
    />
  );
};

export default Header;
