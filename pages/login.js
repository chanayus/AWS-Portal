import { AnimatePresence, motion } from "framer-motion";
import tw, { styled } from "twin.macro";
import { useContext, useState } from "react";

import BoxLoader from "../components/loader/BoxLoader";
import Link from "next/link";
import Logo from "../components/icon/Logo";
import LogoNoText from "../components/icon/LogoNoText";
import { SetUserContext } from "./_app";
import TextInput from "../components/input/TextInput";
import { useRouter } from "next/router";

const Login = () => {
  const [record, setRecord] = useState({});
  const router = useRouter();
  const { user, userHandle } = useContext(SetUserContext);
  const [loading, setLoading] = useState(false);

  const changeRecord = (e) => {
    const { name, value } = e?.target;
    setRecord({ ...record, [name]: value });
  };

  const icon = {
    hidden: {
      pathLength: 0,
      opacity: 0.1,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
    },
  };
  const loginHandler = async () => {
    if (!(record?.username && record?.password)) {
      return false;
    }

    setLoading(true);
    let abortController = new AbortController();
    try {
      const response = await fetch("/api/login", {
        signal: abortController.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });
      const data = await response.json();
      userHandle({ user: data?.login?.user });
      router.replace("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed w-full h-full flex justify-center items-center z-50" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.175 }}>
            <div className="w-50 h-50 p-3 rounded-full bg-white">
              <BoxLoader classProps={"text-black"} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Container>
        <FlexBox>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <LoginForm className="backdrop-filter backdrop-blur rounded shadow">
            <div className="flex items-center md:mt-5">
              <div className="hidden md:block w-24 sm:w-14">
                <LogoNoText />
              </div>
              <h1 className="text-black md:text-white text-5xl sm:text-3xl font-bold md:ml-3">เข้าสู่ระบบ</h1>
            </div>

            <div className="form-group">
              <TextInput type="text" name="username" id="" required={true} title="Username" value={record?.username ?? ""} setValueHandler={changeRecord} />
              <TextInput type="password" name="password" id="" required={true} title="Password" value={record?.password ?? ""} setValueHandler={changeRecord} />
            </div>
            <div className="button-group">
              <a onClick={loginHandler}>เข้าสู่ระบบ</a>
              <a href="">ลืมรหัสผ่าน ?</a>
            </div>
          </LoginForm>
        </FlexBox>
      </Container>
    </>
  );
};

export default Login;

const Container = styled.div`
  ${tw`flex justify-around relative items-center w-full h-screen duration-200 bg-gradient-to-tr from-black via-gray-900 to-indigo-900`}
`;

const FlexBox = styled.div`
  ${tw`flex justify-around w-full duration-200`}
  height: clamp(450px,25vw,500px);
  @media (max-width: 960px) {
    ${tw`justify-center w-full duration-200 h-screen`}
  }
`;

const LogoWrapper = styled.div`
  ${tw`flex items-center justify-center md:hidden ml-3`}
  svg {
    width: clamp(320px, 25vw, 450px);
  }
`;

const LoginForm = styled.form`
  ${tw`flex flex-col justify-between ml-24 w-full duration-200 bg-white px-8 py-12 md:py-0`}
  max-width: 500px;
  @media (max-width: 960px) {
    background: rgba(0, 0, 0, 0.3);
    ${tw`justify-evenly max-w-full m-0 text-white`}
    input, label {
      color: #ccc;
      :focus ~ label,
      :valid ~ label,
      :-webkit-autofill ~ label {
        color: #fff;
      }
    }
    .bar {
      &::before,
      &::after {
        background: #fff;
      }
    }
  }
  .form-group {
    ${tw`flex flex-col md:my-8 sm:my-0`}
  }
  .button-group {
    ${tw`flex items-center flex-wrap gap-y-7 md:justify-around`}
    a:first-child {
      flex: 1;
      max-width: 250px;
      min-width: 250px;
      padding: 10px 30px;
      background: ${(props) => props.theme.blue};
      color: #fff;
      text-align: center;
      cursor: pointer;
    }
    a:last-child {
      ${tw`min-w-max ml-16 xs:mt-0 md:ml-0`}
    }
  }
`;
