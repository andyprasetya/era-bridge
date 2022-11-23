import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { hashRouterList } from "../../constants/routes";
import { strLang } from "../../functions/language";
import Card from "../../components/Card";
import logoRec from "../../images/logo-rectangle.png";
import logoIdea from "../../images/logo-idea.png";
import logoPerludem from "../../images/logo-perludem.png";
import logoQGISID from "../../images/logo-qgis-id.png";
import { BTNLine, BTNSolid } from "../../components/Button";
import MarginSpace from "../../components/Margin";

// Main Home Content for offline app
export default function Home() {
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white">
      {/* Home Header */}
      <div className="container max-w-8xl relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-11/12 px-4 ml-auto mr-auto text-start">
            <div className="mt-8 mb-4 md:flex max-w-6xl">
              <img src={logoRec} className="w-80" alt="logo" />
              <div className="md:border-l-2 pl-6 space-x-6 flex md:ml-auto">
                <img src={logoIdea} className="h-20" alt="International Idea" />
                <img src={logoPerludem} className="h-20" alt="Perludem" />
                <img src={logoQGISID} className="h-20" alt="QGIS ID" />
              </div>
            </div>
            <div className="bg-primary-grayLight bg-opacity-30 p-6 text-lg font-normal text-primary-blue leading-relaxed mb-4 max-w-6xl">
              {strLang.app_desc}
              <ul className="list-disc list-inside">
                <li>{strLang.app_desc_1}</li>
                <li>{strLang.app_desc_2}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Home 3 Main Feature */}
      <div className="px-3 md:px-8 -mt-24 bg-primary-grayLight">
        <div className="container mx-auto max-w-full mt-40">
          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3">
            <Card
              title={strLang.nav_knowledge_hub}
              headColor="bg-gradient-to-tr from-secondary-pink to-pink-700 shadow-lg-pink"
            >
              <p className="text-md font-light leading-relaxed mt-0 mb-4 whitespace-pre-line">
                {strLang.knowledge_hub_desc}
              </p>
              <LinkRouter to={hashRouterList.knowledgeHub}>
                <BTNSolid className="w-full">{strLang.btn_lets_learn}</BTNSolid>
              </LinkRouter>
            </Card>
            <Card
              title={strLang.nav_the_districting_workshop}
              headColor="bg-gradient-to-tr from-secondary-green to-green-700 shadow-lg-green"
            >
              <p className="text-md font-light leading-relaxed mt-0 mb-4 whitespace-pre-line">
                {strLang.the_districting_workshop_desc}
              </p>
              <div className="flex justify-center items-center gap-x-2">
                <LinkRouter to={hashRouterList.tutorial} className="w-full">
                  <BTNLine className="w-full px-0" style={{paddingLeft:'0', paddingRight:'0'}}>
                    {strLang.nav_tutorial}
                  </BTNLine>
                </LinkRouter>
                <LinkRouter
                  to={hashRouterList.workshop}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <BTNSolid className="w-full px-0" style={{paddingLeft:'0', paddingRight:'0'}}>
                    {strLang.btn_lets_create}
                  </BTNSolid>
                </LinkRouter>
              </div>
            </Card>
            <Card
              title={strLang.nav_map_library}
              headColor="bg-gradient-to-tr from-secondary-purple to-purple-700 shadow-lg-purple"
            >
              <p className="text-md font-light leading-relaxed mt-0 mb-4 whitespace-pre-line">
                {strLang.map_library_desc}
              </p>
              <LinkRouter to={hashRouterList.mapLibrary}>
                <BTNSolid className="w-full">
                  {strLang.btn_lets_browse}
                </BTNSolid>
              </LinkRouter>
            </Card>
          </div>
        </div>
        <MarginSpace />
      </div>
    </div>
  );
}
