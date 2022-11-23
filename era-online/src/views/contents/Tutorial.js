import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import { strLang } from "../../functions/language";
import { hashRouterList } from "../../constants/routes";
import { BTNSolid } from "../../components/Button";
import MarginSpace from "../../components/Margin";
import { isLogin } from "../../actions/user";

// Tutorial content
function TutorialContent() {
  const [listLinks, setListLinks] = React.useState([]);
  const [listVideo, setListVideo] = React.useState([]);

  React.useEffect(() => {
    fetch("data/json/links.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setListLinks(response);
      });

    fetch("data/tutorial/list.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setListVideo(response);
      });
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">
        {strLang.title_getting_started}
      </h2>
      <div>
        <p className="relative min-h-full whitespace-pre-line mb-2">
          {strLang.getting_started_desc}
        </p>
        {isLogin() ? <ul className="list-disc list-inside">
          {listLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-700 underline"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul> : 
        <LinkRouter to={hashRouterList.signIn} className="text-blue-700 underline">
        {strLang.msg_login_to_download_resources}
        </LinkRouter>
        }
      </div>
      <div className="mt-10 mb-4 border-t border-primary-orange" />
      <h2 className="text-2xl font-bold mt-10 mb-4">
        {strLang.title_video_tutorial}
      </h2>
      {listVideo.map((video, idx) => (
        <div key={idx} className="mb-8">
          <p className="relative min-h-full whitespace-pre-line mb-2">
            {video.label}
          </p>
          <video className="mx-auto border" width="750" height="500" controls>
            <source src={video.url} type="video/mp4" />
          </video>
        </div>
      ))}
      <div className="mt-10 mb-4 border-t border-primary-orange" />
      <h2 className="text-2xl font-bold mt-10 mb-4">
        {strLang.title_manual_book}
      </h2>
      <iframe
        title="pdf-tutorial"
        src="data/tutorial/manual_book.pdf"
        width="100%"
        height="700"
      />
    </>
  );
}

// Tutorial Page
export default function Tutorial() {
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <h1 className="text-primary-blue text-5xl font-serif font-bold leading-normal mt-0">
            {strLang.nav_the_districting_workshop}
          </h1>
          <div className="bg-primary-grayLight bg-opacity-30 p-6 text-lg font-normal text-primary-blue leading-relaxed mb-6 max-w-6xl whitespace-pre-line">
            {strLang.tutorial_desc}
          </div>
          <TutorialContent />
        </div>
      </div>
      <LinkRouter
        to={hashRouterList.workshop}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8"
      >
        <BTNSolid className="w-full">{strLang.btn_lets_create}</BTNSolid>
      </LinkRouter>
      <MarginSpace />
    </div>
  );
}
