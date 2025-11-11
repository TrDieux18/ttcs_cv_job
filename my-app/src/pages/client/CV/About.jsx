import { useState } from "react";
const About = () => {
  const [text, setText] = useState("");
  const [user, setUser] = useState({
    text: "ssssdadadad dkjadjalksdj dskjaldkjasld akdjalkdjasl dlakjdalsdj sdkajdlaksdj asdlkajdlasjd asdjadlkajks asdlkajdlakj dlajdlakdj dkjadlkaj asdkjasdlajs aslkdjadlkj asdladas asdaldaj asdlkajdlj aldjadlkj aldkajdl adkjadlkj asdaldj ",
  });
  return (
    <div>
      {user.text && user.text.trim() !== "" ? (
        <div className="">
          <div className="flex">
            <div className="p-5 w-50 whitespace-nowrap font-bold">
              Giới thiệu
            </div>
            <p className="text-truncated ims-2 text-gray-600 text-sm p-5">
              <span dir="auto" className=" align-middle whitespace-pre-line">
                {user.text}
              </span>
            </p>
          </div>
          <div className="pr-5 pl-5">
            <hr />
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default About;
