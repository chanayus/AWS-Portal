import tw, {styled} from 'twin.macro';

import Link from "next/link";
import Logo from '../components/Logo';
import TextInput from "../components/input/TextInput";

const Login = () =>{
    return(
        <Container>
            <FlexBox>
                <LogoWrapper>
                   <Logo/>
                </LogoWrapper>
                <LoginForm className="backdrop-filter backdrop-blur">
                    <h1 className="text-black md:text-white text-5xl xs:text-4xl">Sign In</h1>
                    <div className="form-group">
                        <TextInput type="text" name="" id="" required={true} title="Username"/>
                        <TextInput type="password" name="" id="" required={true} title="Password" />
                    </div>
                    <div className="button-group">
                        <Link href="/"><a>Log in</a></Link>
                        <a href="">Forgot Password ?</a>
                    </div>
                </LoginForm>
            </FlexBox>
        </Container>   
    )
}

export default Login

const Container = styled.div`
    background: url('https://images.unsplash.com/photo-1591478209132-e32752b9af43?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2072&q=80');
    ${tw`flex justify-around items-center w-full min-h-screen duration-200 bg-center bg-cover`}
`

const FlexBox = styled.div`
    ${tw`flex justify-around w-full duration-200`}
    height: 500px;
    @media(max-width: 960px){
        ${tw`justify-center w-full duration-200 h-screen`}
    }
`

const LogoWrapper = styled.div`
    ${tw`flex items-center justify-center md:hidden ml-3`}
    svg{
        width: clamp(320px,40vw,450px);
        fill: #FFF;
        path{
            stroke: #FFF;
        }
    }
`

const LoginForm = styled.form`
    ${tw`flex flex-col justify-between ml-24 w-full duration-200 bg-white px-8 py-12 md:py-0`}
    max-width: 550px;
    @media(max-width: 960px){
        background: rgba(0,0,0,0.7);
        height: 100vh;
        ${tw`justify-center max-w-full m-0 text-white`}
        input, label{
            color: #CCC;
            :focus~label, :valid~label, :-webkit-autofill~label {
                color: #FFF;
            }
        }
        .bar{
            &::before, &::after{
                background: #FFF;
            }
        }
    }
    .form-group{
        ${tw`flex flex-col md:my-20 sm:my-0`}        
    }
    .button-group{
        ${tw`flex justify-around items-center flex-wrap gap-y-7`}
        a:first-child{
            flex: 1;
            max-width: 250px;
            min-width: 250px;
            padding: 10px 30px;
            background: ${(props) => props.theme.blue};
            color: #FFF;
            text-align: center;
        }
        a:last-child{
            ${tw`min-w-max xs:mt-7`}
        }
    }
`