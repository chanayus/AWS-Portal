import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";

const ResourceType = ({title, total}) => {
    return(
        <Card>
            <img className="" src={`/images/resourceIcon/${title}.png`} alt="" />
            <h1 className="service-name">{title}</h1>
            <h1 className="font-light">{total}</h1>
        </Card>
    );
}

const Card = styled(motion.div)`
    ${tw`flex px-5 py-2 justify-between relative items-center rounded-xl shadow-md`}
    width: 400px;
    max-width: 100%;
    height: 130px;
    background: #111;
    img{
        ${tw`absolute w-14 -top-6 rounded-md`}
    }
    h1{
        color: #FFF;
        margin-top: 7px;
        &.service-name{
            width: 75%;
            text-transform: capitalize;
            font-size:clamp(24px,5vmin,26px);
            word-wrap: break-word;
            line-height: 1;
        }
    }
`

export default ResourceType