/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState } from "react";
import ReactDOMServer from "react-dom/server";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { strLang } from "../../functions/language";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/solid";
import MarginSpace from "../../components/Margin";
import { browserRouterList } from "../../constants/routes";
import logoAce from "../../images/logo-ace.png";
const path = require("path");
const knowledgeHubPath = "data/knowledge-hub/";

// function for resizing iframe to scrollheoght document
// function resizeIframe(obj) {
//   try {
//     obj.style.height =
//       obj.contentWindow.document.documentElement.scrollHeight + "px";
//   } catch (err) {
//     console.log(err);
//   }
// }

// Convert MD Text to HTML Text
function imgMDtoStatic(mdText) {
  const mdHTMLBody = document.createElement("div");
  mdHTMLBody.style.textAlign = "justify";
  mdHTMLBody.style.fontFamily = "sans-serif, Helvetica, Arial";
  mdHTMLBody.innerHTML = ReactDOMServer.renderToStaticMarkup(
    <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdText}</ReactMarkdown>
  );

  // Change img source path to local html electron
  const images = mdHTMLBody.getElementsByTagName("img");
  for (let i = 0; i < images.length; i++) {
    try {
      const imgFile = path.basename(images[i].src);
      const newImgURL = `${knowledgeHubPath}file/img/${imgFile}`;
      images[i].src = newImgURL;
      images[i].style.display = "block";
      images[i].style.marginLeft = "auto";
      images[i].style.marginRight = "auto";
      images[i].style.width = "75%";
    } catch (err) {
      console.log(err);
    }
  }
  return mdHTMLBody.outerHTML;
}

// Accordion style color and text, change here
function accordionStyle(level, id) {
  if(id){
    if(id.startsWith('0')){
      return {
        text: " text-white text-base ",
        font: " font-bold ",
        bg: " bg-secondary-pink ",
        paddingStart: "",
      };
    }
  }
  if (level === 1) {
    return {
      text: " text-white text-base ",
      font: " font-bold ",
      bg: " bg-primary-grayDark ",
      paddingStart: "",
    };
  } else if (level === 2) {
    return {
      text: " text-white ",
      font: " font-semibold ",
      bg: " bg-primary-gray ",
      paddingStart: " pl-4 ",
    };
  } else if (level === 3) {
    return {
      text: " text-white",
      font: " font-medium ",
      bg: " bg-primary-grayMain ",
      paddingStart: " pl-8 ",
    };
  } else if (level === 4) {
    return {
      text: " text-black",
      font: " font-normal ",
      bg: " bg-primary-grayLight ",
      paddingStart: " pl-12 ",
    };
  } else {
    return {
      text: " text-black text-sm ",
      font: " font-normal ",
      bg: " bg-primary-grayLight ",
      paddingStart: " pl-16 ",
    };
  }
}

// Accordion for knowledge hub content
function Accordion({ objData }) {
  const [openAcc, setOpenAcc] = useState(false);
  const [objHeight, setObjHeight] = useState('10px');
  const [mdTextX, setMDTextX] = useState('');
  const iFrameRef = React.useRef(null);
  // const mdTextX = React.useRef("");
  const idStart = objData.id.split("-").length;
  const classes = accordionStyle(idStart, objData.id);

  // Load MD File once when the component load
  React.useEffect(() => {
    // if (mdTextX.current !== "") return;
    async function loadMD(url) {
      const mdFile = `${knowledgeHubPath}file/${url}.md`;
      const mdText = await fetch(mdFile).then((out) => out.text());
      setMDTextX(mdText)
      // mdTextX.current = mdText;
      // if (iFrameRef.current) resizeIframe(iFrameRef.current);
      // console.log(iFrameRef.current.contentWindow.document.documentElement.scrollHeight)
      // if (iFrameRef.current) setObjHeight(iFrameRef.current.contentWindow.document.documentElement.scrollHeight + "px")
    }
    loadMD(objData.file);
  }, [objData.file]);

  return (
    <div
      className={
        "relative border-b border-white mx-auto" + classes.paddingStart
      }
    >
      <button
        type="button"
        className={"w-full px-2 py-2 text-left focus:outline-none" + classes.bg}
        onClick={() => setOpenAcc(!openAcc)}
      >
        <div className="flex items-start">
          {openAcc ? (
            <ChevronDownIcon className={"h-5 w-5" + classes.text} />
          ) : (
            <ChevronRightIcon className={"h-5 w-5" + classes.text} />
          )}
          <span className={"ml-2" + classes.text + classes.font}>
            {objData.title}
          </span>
        </div>
      </button>

      <div
        className={
          openAcc
            ? ""
            : "hidden " +
              "relative overflow-hidden transition-all max-h-0 duration-700"
        }
      >
        <div className="px-4 py-1 border-gray-500 border text-justify">
          {mdTextX && openAcc && <iframe
            ref={iFrameRef}
            // Change IMG in MD format to html format local
            srcDoc={imgMDtoStatic(mdTextX)}
            onLoad={(e) => {
              setObjHeight(e.target.contentWindow.document.documentElement.scrollHeight + "px");
              // resizeIframe(e.target)
            }}
            width="100%"
            style={{height:objHeight}}
            title={objData.file}
          />}
        </div>
      </div>
    </div>
  );
}

// Knowledge Hub Content
export default function KnowledgeHub() {
  const [outline, setOutline] = useState([]);
  // Scroll to top on first load
  React.useEffect(() => {
    window.scrollTo(0, 0);
    fetch(knowledgeHubPath + "outline.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        setOutline(response);
      });
  }, []);

  return (
    <div className="bg-primary-grayLight h-full py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md p-8 mx-8">
          <h1 className="text-primary-blue text-5xl font-serif font-bold leading-normal mt-0">
            {strLang.nav_knowledge_hub}
          </h1>
          <div className="bg-primary-grayLight bg-opacity-30 p-6 text-lg font-normal text-primary-blue leading-relaxed mb-6 max-w-6xl whitespace-pre-line">
            {strLang.knowledge_hub_desc}
          </div>
          {outline.map((objData, idx) => (
            <Accordion key={idx} objData={objData}></Accordion>
          ))}
          <div className="mt-8 flex">
            <p className="font-bold">{strLang.msg_for_more_information}</p>
            <a
              href={browserRouterList.aceProject}
              target="_blank"
              rel="noreferrer"
            >
              <img src={logoAce} className="h-16" alt="Ace Project" />
            </a>
          </div>
        </div>
      </div>
      <MarginSpace />
    </div>
  );
}
