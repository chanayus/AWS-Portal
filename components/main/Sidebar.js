import styled from "styled-components"
import tw from 'twin.macro';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () =>{
    return(
        <Container>
            <FontAwesomeIcon icon={["fab", "aws"]} size="3x"/>
            <Menu>
               <button>
                    <FontAwesomeIcon icon="home" size="2x"/>
                    หน้าหลัก
                </button> 
               <button>
                    <FontAwesomeIcon icon="history" size="2x"/>
                   ประวัติ
                </button> 
               <button>
                    <FontAwesomeIcon icon="server" size="2x"/>
                   Resource <br/>ที่ถูกใช้งาน
                </button> 
            </Menu>
            <button>
                <FontAwesomeIcon icon={["fas", "sign-out-alt"]} size="2x"/>
                ออกจากระบบ
            </button>
        </Container>
    )
}

const Container = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 130px;
    height: 100vh; 
    background: ${props => props.theme.white};
    z-index: 10;
    ${tw`flex flex-col justify-between items-center py-7 pb-2 flex-shrink-0`}
    svg{
        width: 100%;
    }
    button{
        ${tw`flex flex-col justify-center items-center rounded flex-shrink-0`}
        width: 100px;
        height: 85px;    
        color: ${props => props.theme.black};
        margin: 10px 0;
        transition: 0.25s;
        line-height: 1.3;
        :hover{
            background: ${props => props.theme.black};
            color: #FFF;
        }
    }
`
const Menu = styled.div`
    ${tw`flex flex-col justify-start items-center flex-1 pt-14 flex-shrink-0`}
`

export default Sidebar