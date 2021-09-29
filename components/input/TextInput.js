import styled from "styled-components"

const TextInput = (props) => {
    return (
        <Container>                     
            <input type={props.type} required={props.required} className="text-input"/>
            <label>{props.title}</label>
            <div className="bar"></div>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 0 0 20px 0;
    padding-top: 20px;
    .bar{
        &::after{
            right: 0;
        }
        &::before{
            left: 0;
        }
        &::before, &::after{
            position: absolute;
            content: "";
             width: 0%;
            height: 4px;
            background: #050505;
            bottom: 0;
            z-index: 10;
            transition: 0.25s;
        }        
    }
    label {
        position: absolute;
        top: 28%;
        left: 5px;
        width: 100%;
        color: rgba(0,0,0, 0.5);
        transition: 0.25s;
        cursor: text;
        font-size: 1.1rem;
        padding-top: 3px; 
    }
    input{
        width: 100%;     
        outline: none;
        border: none;
        background: transparent;
        font-size: 1rem;
        padding: 5px 0 5px 5px;
        position: relative;
        border-bottom: 2px solid #666;
        z-index: 3; 
        :focus~label, :valid~label, :-webkit-autofill~label {
            top: -8px;
            left: 0;
            color: #111;
            font-weight: 500;
            transition: 0.25s;
        }
        :focus ~ .bar{
            &::before, &::after{
                width: 50%;
            }
        }
    }
`

export default TextInput