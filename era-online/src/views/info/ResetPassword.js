import React from "react";
import { Link as LinkRouter, useParams } from "react-router-dom";
import { resetPassword, resetPasswordType } from "../../actions/user";
import { BTNLine, BTNSolid } from "../../components/Button";
import { constParams } from "../../constants/formData";
import { hashRouterList } from "../../constants/routes";
import { strLang } from "../../functions/language";
import spinner from "../../images/spinner.svg";
import success from "../../images/success.png";
import failed from "../../images/failed.png";

function SuccessContent({ response }) {
  return (
    <>
      <img src={success} className="h-48 mx-auto" alt="img" />
      <p className="text-lg mt-6 px-12 font-normal">{response.json.message}</p>
      <LinkRouter to={hashRouterList.signIn}>
        <BTNSolid className="mt-8">{strLang.btn_sign_in}</BTNSolid>
      </LinkRouter>
    </>
  );
}

function FailedContent({ response }) {
  return (
    <>
      <img src={failed} className="h-48 mx-auto" alt="img" />
      <p className="text-lg mt-6 px-12 font-normal">{response.json.message}</p>
      <LinkRouter to={hashRouterList.home}>
        <BTNSolid className="mt-8">{strLang.nav_home}</BTNSolid>
      </LinkRouter>
      <span
        className="ml-2"
        onClick={() => {
          window.location.reload();
        }}
      >
        <BTNLine className="mt-8">{strLang.btn_retry}</BTNLine>
      </span>
    </>
  );
}

function DefaultContent() {
  return (
    <>
      <img src={spinner} className="h-48 mx-auto" alt={strLang.msg_loading} />
      <p className="text-lg mt-6 px-12 font-normal">{strLang.msg_resetting}</p>
      <LinkRouter to={hashRouterList.home}>
        <BTNSolid className="mt-8">{strLang.nav_home}</BTNSolid>
      </LinkRouter>
    </>
  );
}

// Do verification in backend
async function resetting(params) {
  const response = await resetPassword(
    {
      [constParams.id]: { value: params[constParams.id] },
      [constParams.email]: { value: params[constParams.email] },
      [constParams.token]: { value: params[constParams.token] },
    },
    resetPasswordType.reset
  );
  if (response.status === 200) {
    return <SuccessContent response={response} />;
  } else {
    return <FailedContent response={response} />;
  }
}

export default function ResetPassword() {
  const params = useParams();
  const [content, setContent] = React.useState(<DefaultContent />);
  React.useEffect(() => {
    async function runReset() {
      const response = await resetting(params);
      setContent(response);
    }
    runReset();
  }, [params]);

  return (
    <div className="bg-primary-grayLight">
      <div className="w-9/12 m-auto py-8 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden pb-8">
          <div className="border-t border-gray-200 text-center pt-8 max-w-2xl">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}
