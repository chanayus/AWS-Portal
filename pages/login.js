import tw, {styled} from 'twin.macro';

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
                    <h1 className="text-black">Sign In</h1>
                    <div className="form-group">
                        <TextInput type="text" name="" id="" required={true} title="Username"/>
                        <TextInput type="password" name="" id="" required={true} title="Password" />
                    </div>
                    <div className="button-group">
                        <button type="submit">Log in</button>
                        <a href="">Forgot Password ?</a>
                    </div>
                </LoginForm>
            </FlexBox>
        </Container>   
    )
}

export default Login

const Container = styled.div`
    background: url('https://images.unsplash.com/photo-1618388810903-840bb0d15ea5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
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
    ${tw`flex flex-col justify-between ml-24 w-full duration-200 bg-white px-8 py-12`}
    max-width: 550px;
    @media(max-width: 960px){
        background: rgba(0,0,0,0.7);
        ${tw`justify-evenly max-w-full m-0 text-white`}
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
        ${tw`flex flex-col`}        
    }
    .button-group{
        ${tw`flex justify-around items-center flex-wrap gap-y-7`}
        button{
            flex: 1;
            max-width: 250px;
            min-width: 250px;
            padding: 10px 30px;
            background: ${(props) => props.theme.blue};
            color: #FFF;
        }
        a{
            ${tw`min-w-max`}
        }
    }
`