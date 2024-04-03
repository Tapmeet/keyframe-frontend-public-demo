// @flow

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import HomePage from "../Pages/Home";
import PricingPage from "../Pages/Pricing";
import VideoPage from "../Pages/VideoPage";
import HomePageV2 from "../Pages/HomeV2";
import SharePage from "../Pages/SharePage";
import ThankyouPage from "../Pages/ThankyouPage";
import SuccessPage from "../Pages/SuccessPage";
import HomePageV3 from "../Pages/HomeV3";
import SupportPage from "../Pages/Support";
import PrivacyPage from "../Pages/Privacy";
import SignupPage from "../Pages/Signup";
import LoginPage from "../Pages/Login";
import ResetPage from "../Pages/ResetPassword";
import TokenVerification from "../Pages/ResetPassword/TokenVerification";
import EmailVerification from "../Pages/Signup/TokenVerification";
import ResetNewPassword from "../Pages/ResetPassword/NewPassword";
import UserHome from "../Pages/Users/Home";
import TemplateOne from "../Pages/Users/Templates/Template1/Template1";
import Block1 from "../Pages/Users/Templates/Template1/Block/Block1";
import Block2 from "../Pages/Users/Templates/Template1/Block/Block2";
import Block3 from "../Pages/Users/Templates/Template1/Block/Block3";
import Block4 from "../Pages/Users/Templates/Template1/Block/Block4";

import TemplateNew1 from "../Pages/Templates/Scenes/Scene1";
import TemplateScene2 from "../Pages/Templates/Scenes/Scene2";
import TemplateScene3 from "../Pages/Templates/Scenes/Scene3";
import TemplateScene4 from "../Pages/Templates/Scenes/Scene4";
import TemplateScene5 from "../Pages/Templates/Scenes/Scene5";
import TemplateScene6 from "../Pages/Templates/Scenes/Scene6";
import TemplateScene7 from "../Pages/Templates/Scenes/Scene7";
import TemplateScene8 from "../Pages/Templates/Scenes/Scene8";
import TemplateScene9 from "../Pages/Templates/Scenes/Scene9";
import TemplateScene10 from "../Pages/Templates/Scenes/Scene10";
import TemplateScene11 from "../Pages/Templates/Scenes/Scene11";
import TemplateScene12 from "../Pages/Templates/Scenes/Scene12";
import TemplateScene13 from "../Pages/Templates/Scenes/Scene13";
import TemplateScene14 from "../Pages/Templates/Scenes/Scene14";
import TemplateScene15 from "../Pages/Templates/Scenes/Scene15";
import TemplateScene16 from "../Pages/Templates/Scenes/Scene16";
import TemplateScene17 from "../Pages/Templates/Scenes/Scene17";
import TemplateScene18 from "../Pages/Templates/Scenes/Scene18";
import TemplateScene19 from "../Pages/Templates/Scenes/Scene19";
import TemplateScene20 from "../Pages/Templates/Scenes/Scene20";
import TemplateScene21 from "../Pages/Templates/Scenes/Scene21";
import TemplateScene22 from "../Pages/Templates/Scenes/Scene22";
import TemplateScene23 from "../Pages/Templates/Scenes/Scene23";
import TemplateScene24 from "../Pages/Templates/Scenes/Scene24";
import TemplateScene25 from "../Pages/Templates/Scenes/Scene25";
import TemplateScene26 from "../Pages/Templates/Scenes/Scene26";
import TemplateScene27 from "../Pages/Templates/Scenes/Scene27";
import TemplateScene28 from "../Pages/Templates/Scenes/Scene28";
import TemplateScene29 from "../Pages/Templates/Scenes/Scene29";
import TemplateScene30 from "../Pages/Templates/Scenes/Scene30";
import TemplateScene31 from "../Pages/Templates/Scenes/Scene31";
import TemplateScene32 from "../Pages/Templates/Scenes/Scene32";
import TemplateScene33 from "../Pages/Templates/Scenes/Scene33";
import TemplateScene34 from "../Pages/Templates/Scenes/Scene34";
import TemplateScene35 from "../Pages/Templates/Scenes/Scene35";
import TemplateScene36 from "../Pages/Templates/Scenes/Scene36";
import TemplateScene37 from "../Pages/Templates/Scenes/Scene37";
import TemplateScene38 from "../Pages/Templates/Scenes/Scene38";
import TemplateScene39 from "../Pages/Templates/Scenes/Scene39";
import TemplateScene40 from "../Pages/Templates/Scenes/Scene40";
import TemplateScene41 from "../Pages/Templates/Scenes/Scene41";
import TemplateScene42 from "../Pages/Templates/Scenes/Scene42";
import TemplateScene43 from "../Pages/Templates/Scenes/Scene43";
import TemplateScene44 from "../Pages/Templates/Scenes/Scene44";
import TemplateScene45 from "../Pages/Templates/Scenes/Scene45";
import TemplateScene46 from "../Pages/Templates/Scenes/Scene46";
import TemplateScene47 from "../Pages/Templates/Scenes/Scene47";
import TemplateScene48 from "../Pages/Templates/Scenes/Scene48";
import TemplateScene49 from "../Pages/Templates/Scenes/Scene49";
import TemplateScene50 from "../Pages/Templates/Scenes/Scene50";
import TemplateScene51 from "../Pages/Templates/Scenes/Scene51";
import TemplateScene52 from "../Pages/Templates/Scenes/Scene52";
import TemplateScene53 from "../Pages/Templates/Scenes/Scene53";
import TemplateScene54 from "../Pages/Templates/Scenes/Scene54";
import TemplateScene55 from "../Pages/Templates/Scenes/Scene55";
import TemplateScene56 from "../Pages/Templates/Scenes/Scene56";
import TemplateScene57 from "../Pages/Templates/Scenes/Scene57";
import TemplateScene58 from "../Pages/Templates/Scenes/Scene58";
import TemplateScene59 from "../Pages/Templates/Scenes/Scene59";
import TemplateScene60 from "../Pages/Templates/Scenes/Scene60";
import TemplateScene61 from "../Pages/Templates/Scenes/Scene61";
import TemplateScene62 from "../Pages/Templates/Scenes/Scene62";
import TemplateScene63 from "../Pages/Templates/Scenes/Scene63";
import TemplateScene64 from "../Pages/Templates/Scenes/Scene64";
import TemplateScene65 from "../Pages/Templates/Scenes/Scene65";
import TemplateScene66 from "../Pages/Templates/Scenes/Scene66";
import TemplateScene67 from "../Pages/Templates/Scenes/Scene67";
import TemplateScene68 from "../Pages/Templates/Scenes/Scene68";
import TemplateScene69 from "../Pages/Templates/Scenes/Scene69";
import TemplateScene70 from "../Pages/Templates/Scenes/Scene70";
import TemplateScene71 from "../Pages/Templates/Scenes/Scene71";
import TemplateScene72 from "../Pages/Templates/Scenes/Scene72";
import TemplateScene73 from "../Pages/Templates/Scenes/Scene73"; 
import TemplateScene74 from "../Pages/Templates/Scenes/Scene74"; 
import TemplateScene75 from "../Pages/Templates/Scenes/Scene75"; 
import TemplateScene76 from "../Pages/Templates/Scenes/Scene76"; 
import TemplateScene77 from "../Pages/Templates/Scenes/Scene77"; 
import TemplateScene78 from "../Pages/Templates/Scenes/Scene78"; 
import TemplateSceneLast2 from "../Pages/Templates/Scenes/SceneLast2";

import TemplateSceneLast from "../Pages/Templates/Scenes/SceneLast";
import CreateTemplate from "../Pages/CreateTemplate/";
import MyTemplates from "../Pages/Users/MyTemplates";
import MyVideos from "../Pages/Users/MyVideos";
import ExportVideo from "../Pages/ExportVideo";
import ProfilePage from "../Pages/Profile";
import ChangePassword from "../Pages/Profile/ChangePassword";
import UpgradePlan from "../Pages/Profile/UpgradePlan";
import EditProfile from "../Pages/Profile/EditProfile";
import Billing from "../Pages/Profile/Billing";
import Transactions from "../Pages/Profile/Transactions";
import ProductMonthly from "../Pages/Plans/ProductMonthly";
import TeamMonthly from "../Pages/Plans/TeamMonthly"
import TeamAnnual from "../Pages/Plans/TeamAnnual"
import ProfessionalAnnual from "../Pages/Plans/ProfessionalAnnual"
import FreePlan from "../Pages/Plans/FreePlan"
import Team from "../Pages/Team/";
import jwt_decode from "jwt-decode";
import Cookies from "universal-cookie";
import { Home } from "@material-ui/icons";
import SuccessPageSignup from "../Pages/Signup/Sucess";
const Routes = () => {
  const [userToken, setUserToken] = React.useState("");
  const cookies = new Cookies();
  const [userName, setUserName] = React.useState("");
  const [redirectPath, setRedirectPath] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  React.useEffect(() => {
    if (cookies.get("token")) {
      setUserToken(cookies.get("token"));
      const token = cookies.get("token");
      const decoded = jwt_decode(token);
      setUserName(decoded.firstName);
    }
  }, [userToken, cookies]);

  return (
    <Router>
      <main>
        <Switch>
          {/* <Route path="/" exact component={HomePageV3} /> */}
          <Route path="/" exact component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/play/:id" component={VideoPage} />
          <Route path="/pricing" component={PricingPage} />
          <Route path="/thankyou" component={ThankyouPage} />
          <Route path="/success" component={SuccessPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/reset-password" component={ResetPage} />
          <Route path="/privacy-policy" component={PrivacyPage} />
          <Route path="/email-verification" component={EmailVerification} />
          <Route path="/verification" component={TokenVerification} />
          <Route path="/new-password" component={ResetNewPassword} />
          <Route exact path="/home" component={HomePageV2} />
          <Route path="/edit-template/1" component={TemplateOne} />
          <Route path="/edit-template/block/1" component={Block1} />
          <Route path="/edit-template/block/2" component={Block2} />
          <Route path="/edit-template/block/3" component={Block3} />
          <Route path="/edit-template/block/4" component={Block4} />

          <Route path="/support" component={SupportPage} />
          <Route path="/template/:id/1/:sceneid" component={TemplateNew1} />
          <Route path="/template/:id/2/:sceneid" component={TemplateScene2} />
          <Route path="/template/:id/3/:sceneid" component={TemplateScene3} />
          <Route path="/template/:id/4/:sceneid" component={TemplateScene4} />
          <Route path="/template/:id/5/:sceneid" component={TemplateScene5} />
          <Route path="/template/:id/6/:sceneid" component={TemplateScene6} />
          <Route path="/template/:id/7/:sceneid" component={TemplateScene7} />
          <Route path="/template/:id/8/:sceneid" component={TemplateScene8} />
          <Route path="/template/:id/9/:sceneid" component={TemplateScene9} />
          <Route path="/template/:id/10/:sceneid" component={TemplateScene10} />
          <Route path="/template/:id/11/:sceneid" component={TemplateScene11} />
          <Route path="/template/:id/12/:sceneid" component={TemplateScene12} />
          <Route path="/template/:id/13/:sceneid" component={TemplateScene13} />
          <Route path="/template/:id/14/:sceneid" component={TemplateScene14} />
          <Route path="/template/:id/15/:sceneid" component={TemplateScene15} />
          <Route path="/template/:id/16/:sceneid" component={TemplateScene16} />
          <Route path="/template/:id/17/:sceneid" component={TemplateScene17} />
          <Route path="/template/:id/18/:sceneid" component={TemplateScene18} />
          <Route path="/template/:id/19/:sceneid" component={TemplateScene19} />
          <Route path="/template/:id/20/:sceneid" component={TemplateScene20} />
          <Route path="/template/:id/21/:sceneid" component={TemplateScene21} />
          <Route path="/template/:id/22/:sceneid" component={TemplateScene22} />
          <Route path="/template/:id/23/:sceneid" component={TemplateScene23} />
          <Route path="/template/:id/24/:sceneid" component={TemplateScene24} />
          <Route path="/template/:id/25/:sceneid" component={TemplateScene25} />
          <Route path="/template/:id/26/:sceneid" component={TemplateScene26} />
          <Route path="/template/:id/27/:sceneid" component={TemplateScene27} />
          <Route path="/template/:id/28/:sceneid" component={TemplateScene28} />
          <Route path="/template/:id/29/:sceneid" component={TemplateScene29} />
          <Route path="/template/:id/30/:sceneid" component={TemplateScene30} />
          <Route path="/template/:id/31/:sceneid" component={TemplateScene31} />
          <Route path="/template/:id/32/:sceneid" component={TemplateScene32} />
          <Route path="/template/:id/33/:sceneid" component={TemplateScene33} /> 
          <Route path="/template/:id/34/:sceneid" component={TemplateScene34} />
          <Route path="/template/:id/35/:sceneid" component={TemplateScene35} />
          <Route path="/template/:id/36/:sceneid" component={TemplateScene36} />
          <Route path="/template/:id/37/:sceneid" component={TemplateScene37} />
          <Route path="/template/:id/38/:sceneid" component={TemplateScene38} />
          <Route path="/template/:id/39/:sceneid" component={TemplateScene39} />
          <Route path="/template/:id/40/:sceneid" component={TemplateScene40} />
          <Route path="/template/:id/41/:sceneid" component={TemplateScene41} />
          <Route path="/template/:id/42/:sceneid" component={TemplateScene42} />
          <Route path="/template/:id/43/:sceneid" component={TemplateScene43} />
          <Route path="/template/:id/44/:sceneid" component={TemplateScene44} />
          <Route path="/template/:id/45/:sceneid" component={TemplateScene45} />
          <Route path="/template/:id/46/:sceneid" component={TemplateScene46} />
          <Route path="/template/:id/47/:sceneid" component={TemplateScene47} />
          <Route path="/template/:id/48/:sceneid" component={TemplateScene48} />
          <Route path="/template/:id/49/:sceneid" component={TemplateScene49} />
          <Route path="/template/:id/50/:sceneid" component={TemplateScene50} />
          <Route path="/template/:id/51/:sceneid" component={TemplateScene51} />
          <Route path="/template/:id/52/:sceneid" component={TemplateScene52} />
          <Route path="/template/:id/53/:sceneid" component={TemplateScene53} />
          <Route path="/template/:id/54/:sceneid" component={TemplateScene54} />
          <Route path="/template/:id/55/:sceneid" component={TemplateScene55} />
          <Route path="/template/:id/56/:sceneid" component={TemplateScene56} />
          <Route path="/template/:id/57/:sceneid" component={TemplateScene57} />
          <Route path="/template/:id/58/:sceneid" component={TemplateScene58} />
          <Route path="/template/:id/59/:sceneid" component={TemplateScene59} />
          <Route path="/template/:id/60/:sceneid" component={TemplateScene60} />
          <Route path="/template/:id/61/:sceneid" component={TemplateScene61} />
          <Route path="/template/:id/62/:sceneid" component={TemplateScene62} />
          <Route path="/template/:id/63/:sceneid" component={TemplateScene63} />
          <Route path="/template/:id/64/:sceneid" component={TemplateScene64} />
          <Route path="/template/:id/65/:sceneid" component={TemplateScene65} />
          <Route path="/template/:id/66/:sceneid" component={TemplateScene66} />
          <Route path="/template/:id/67/:sceneid" component={TemplateScene67} />
          <Route path="/template/:id/68/:sceneid" component={TemplateScene68} />
          <Route path="/template/:id/69/:sceneid" component={TemplateScene69} />
          <Route path="/template/:id/70/:sceneid" component={TemplateScene70} />
          <Route path="/template/:id/71/:sceneid" component={TemplateScene71} />
          <Route path="/template/:id/72/:sceneid" component={TemplateScene72} />
          <Route path="/template/:id/73/:sceneid" component={TemplateScene73} />
          <Route path="/template/:id/74/:sceneid" component={TemplateScene74} />
          <Route path="/template/:id/75/:sceneid" component={TemplateScene75} />
          <Route path="/template/:id/76/:sceneid" component={TemplateScene76} />
          <Route path="/template/:id/77/:sceneid" component={TemplateScene77} />
          <Route path="/template/:id/78/:sceneid" component={TemplateScene78} />
          <Route path="/template/:id/last2/:sceneid" component={TemplateSceneLast2} />

          <Route path="/template/:id/last/:sceneid" component={TemplateSceneLast} />
          <Route path="/create-template/:id/" component={CreateTemplate} />
          <Route path="/myhome/" component={MyTemplates} />
          <Route path="/my-videos/" component={MyVideos} />
          <Route path="/export-video/:templateId/download/" component={ExportVideo} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/change-password" component={ChangePassword} />
          <Route path="/upgrade-plan" component={UpgradePlan} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/billing" component={Billing} />
          <Route path="/transactions" component={Transactions} />
          <Route path="/team" component={Team} />
          <Route path="/product-monthly" component={ProductMonthly} />
          <Route path="/team-monthly" component={TeamMonthly} />
          <Route path="/team-annual" component={TeamAnnual} />
          <Route path="/product-annual" component={ProfessionalAnnual} />
          <Route path="/free-plan" component={FreePlan} />
          <Route path="/share/:id" component={SharePage} />
          
          <Route path="/signup-success" component={SuccessPageSignup} />
        </Switch>

      </main>
    </Router>
  );
};

export default Routes;
