import React from "react";
import { hashRouterList } from "../constants/routes";
import { strLang } from "../functions/language";
import NavbarJS from "../components/Navbar";
import NavbarTab from "../components/NavbarTab";
import { useLocation, useHistory } from "react-router-dom";
import { isSmallWindow } from "../functions/windowSize";
import logoIdea from "../images/logo-idea.png";
import logoPerludem from "../images/logo-perludem.png";
import logoQGISID from "../images/logo-qgis-id.png";

function AboutContent() {
  return (
    <div className="text-justify">
      <p className="mb-4">
        Boundary delimitation is the process of drawing or redrawing electoral
        districts. It plays a significant role in majority/plurality systems,
        especially those that feature single-member districts and for
        proportional representation electoral systems for creation of
        proportional political representation and to convert votes to seat
        proportionately. Proportionality of the number of people and seats in an
        electoral district is the main purpose of boundary delimitation to
        achieve one person - one vote - one value (OPOVOV) principle, to ensure
        cohesive state administration ties as well as to create strong
        geographical, political, and socio-cultural linkages between
        constituencies and representatives.
      </p>
      <p className="mb-4">
        Electoral Redistricting Apps (ERA) is a universal technology platform or
        tool for drawing electoral districts to ensure the boundary delimitation
        process appropriate on international principles and standards. By using
        technology, the principles of drawing election boundary delimitation
        could be achieved to the fullest with relative ease. For instance,
        digital maps and geographic information systems (GIS) could help
        election management bodies ensure the creation electoral districts that
        fulfil the principles of OPOVOV, contiguity and compactness to name a
        few. The use of technology also makes the delimitation of electoral
        boundaries more transparent and accessible.
      </p>
      <p>
        This software application tool is provided as a global public good that
        would:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          enable anyone with the interest to understand better how electoral
          boundaries were drawn in their respective countries; and
        </li>
        <li>
          to create their own versions of boundary delimitation or
          drawing/redrawing of electoral district as they deem appropriate in
          accordance with the universal standard and principles.
        </li>
      </ul>
      <p className="mb-4">
        The target audience could be, among others, election management bodies
        who don't yet have such technology, election practitioners, civil
        society organizations and political parties. This broadened ability to
        review and develop districting proposals can encourage cooperation among
        these stakeholders and promote multistakeholder discussions over
        boundary delimitation. As such, the discourse is no longer confined
        within the electoral or boundary delimitation commissions, parliaments,
        or political parties, but broadened to civil society organisations and
        other entities that may not have the ways and means to conduct their own
        boundary delimitation exercises. This Tool can be seen as a means for
        “democratising boundary delimitation processes”.
      </p>
      <p className="mb-4">
        The Electoral Redistricting Apps was made by cooperation between The
        International Institute for Democracy and Electoral Assistance (The
        International IDEA), Perkumpulan untuk Pemilu dan Demokrasi “Perludem”
        (Association for Election and Democracy) Indonesia, and Indonesia user
        QGIS community. The tool will not only be beneficial to one or two
        specific countries but also for any country around the world by
        downloading the tool from International IDEA's website free of charge
        provided they have the relevant data of their respective countries or
        territories, such as compatible digital maps and general/voting
        population data.
      </p>
      <table>
        <tbody>
          <tr>
            <td className="align-top">
              <img src={logoIdea} className="h-20 mx-auto" alt="International Idea" />
            </td>
            <td>
              <p className="mb-4">
                <b>International IDEA</b>
                <br />
                <a
                  href="https://www.idea.int"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  www.idea.int
                </a>
                <br />
                Stromsborg SE-103 34 Stockholm, Swedia
                <br />
                Tel: +46 8 698 37 00
                <br />
                Fax: +46 8 20 24 22
              </p>
            </td>
          </tr>
          <tr>
            <td className="align-top">
              <img src={logoPerludem} className="h-20 mx-auto" alt="Perludem" />
            </td>
            <td>
              <p className="mb-4">
                <b>Perludem</b>
                <br />
                <a
                  href="https://www.perludem.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  www.perludem.org
                </a>
                <br />
                Tebet Timur IV A No. 1
                <br />
                Jakarta, Indonesia
                <br />
                Tel: +621 8300004
                <br />
                Email:{" "}
                <a
                  href="mailto:admin@perludem.org"
                  className="text-blue-700 underline"
                >
                  admin@perludem.org
                </a>
              </p>
            </td>
          </tr>
          <tr>
            <td className="align-top">
              <img src={logoQGISID} className="h-20 mx-auto" alt="QGIS ID" />
            </td>
            <td>
              <p className="mb-4">
                <b>QGIS User Group Indonesia</b>
                <br />
                <a
                  href="https://qgis-id.github.io/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  https://qgis-id.github.io/
                </a>
                <br />
                Email:{" "}
                <a
                  href="mailto:qgisid@gmail.com"
                  className="text-blue-700 underline"
                >
                  qgisid@gmail.com
                </a>
                <br />
                Twitter:{" "}
                <a
                  href="https://twitter.com/qgisid"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-700 underline"
                >
                  @qgisid
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function MainContent({ head, children }) {
  return (
    <>
      <h2 className="text-2xl font-bold pb-5 mb-5 border-b-2 border-primary-orange">
        {head}
      </h2>
      <div className="relative min-h-full">{children}</div>
    </>
  );
}

export default function About() {
  const { pathname } = useLocation();
  const history = useHistory();
  const tabList = [
    {
      label: strLang.nav_about,
      url: hashRouterList.about,
    },
    {
      label: strLang.nav_privacy_policy,
      url: hashRouterList.privacyPolicy,
    },
    {
      label: strLang.nav_terms_and_conditions,
      url: hashRouterList.termsAndConditions,
    },
  ];

  // Scroll to top when first load
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-primary-grayLight h-full min-h-screen">
      {/* Generate Navigation Tab */}
      <NavbarJS>
        <>
          {isSmallWindow() ? (
            <select
              value={pathname}
              className="block text-base py-3 px-4 outline-none bg-primary-grayMain lg:pr-48 mr-auto"
              onChange={(e) => history.push(e.target.value)}
            >
              {tabList.map((tab, idx) => (
                <option key={idx} value={tab.url}>
                  {tab.label}
                </option>
              ))}
            </select>
          ) : (
            <ul className="flex lg:pr-48 mr-auto">
              {tabList.map((item, idx) => (
                <NavbarTab key={idx} label={item.label} url={item.url} />
              ))}
            </ul>
          )}
        </>
      </NavbarJS>
      {/* Return Content based on hashrouter */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-md p-8 mx-8">
            {pathname === hashRouterList.about ? (
              <MainContent head={strLang.nav_about}>
                <AboutContent />
              </MainContent>
            ) : pathname === hashRouterList.privacyPolicy ? (
              <MainContent head={strLang.nav_privacy_policy}>
                <p className="mb-4">
                  Our privacy policy refer to the following link :{" "}
                  <a
                    href="https://www.idea.int/privacy-policy"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline"
                  >
                    https://www.idea.int/privacy-policy
                  </a>
                </p>
              </MainContent>
            ) : pathname === hashRouterList.termsAndConditions ? (
              <MainContent head={strLang.nav_terms_and_conditions}>
                <p className="mb-4">
                  Our terms &amp; conditions refer to the following link :{" "}
                  <a
                    href="https://www.idea.int/terms-and-conditions"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-700 underline"
                  >
                    https://www.idea.int/terms-and-conditions
                  </a>
                </p>
              </MainContent>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
