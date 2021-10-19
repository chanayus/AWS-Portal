import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { TableWrapper } from "../styles/styleComponents";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import tw from "twin.macro";

export const getStaticProps = async () => {
  const res = await fetch("https://6bum1uds90.execute-api.ap-southeast-1.amazonaws.com/api/get-resources");
  const data = await res.json();
  return {
    props: { resourcesData: data },
  };
};

const Index = ({ resourcesData }) => {
  const cardlist = [
    { color: "#7fe490", url: "/", title: "IAM ที่กำลังใช้ Resource", value: "255", icon: "user" },
    { color: "#e07272", url: "/", title: "IAM ทั้งหมด", value: "255", icon: "users" },
    { color: "#778bf0", url: "/", title: "ค่าใช้จ่าย", value: "255", icon: "money-check-alt" },
    { color: "#e2a54a", url: "/resource", title: "Resource ที่กำลังใช้งาน", value: "255", icon: "server" },
  ];
  console.log(resourcesData)
  return (
    <>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-4 gap-8 xl:gap-3 lg:grid-cols-2  mt-6">
        {cardlist.map((value, index) => (
          <Link href={value.url} key={index}>
            <DataCard color={value.color}>
              <FontAwesomeIcon icon={value.icon} size="4x" className="mr-4" />
              <div>
                <h2>{value.title}</h2>
                <h1>{value.value}</h1>
              </div>
            </DataCard>
          </Link>
        ))}
      </div>
      <div className="flex justify-between mt-20 gap-10 lg:flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-lg">Resource ในแต่ละ Region</h2>
            <button className="text-white bg-black px-3 py-2 rounded md:text-xs">ดูทั้งหมด</button>
          </div>
          <TableWrapper className="mt-4 md:pt-6">
            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>จำนวน Resource</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(resourcesData).map((value, index) => (
                  <tr key={index}>
                    <td>{value}</td>
                    <td>{resourcesData[value].length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>
        <div className="flex-1 lg:mt-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-lg">Resource ที่ถูกสร้างล่าสุด</h2>
            <button className="text-white bg-black px-3 py-2 rounded md:text-xs">ดูทั้งหมด</button>
          </div>
          <TableWrapper className="mt-4">
            <table>
              <thead>
                <tr>
                  <th>Resource</th>
                  <th>สร้างเมื่อ</th>
                  <th>สร้างโดย</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>EC2</td>
                  <td>10/4/2021 11:09AM</td>
                  <td>IAM User 1</td>
                </tr>
              </tbody>
            </table>
          </TableWrapper>
        </div>
      </div>
    </>
  );
};


const DataCard = styled.div`
  ${tw`flex justify-center flex-col rounded-2xl pl-5 cursor-pointer md:px-4 md:mr-0 relative overflow-hidden duration-100 shadow-lg hover:shadow-2xl`}
  background: ${props => props.theme.subColor};
  height: 140px;
  svg {
    ${tw`absolute -bottom-4 -right-5 block xs:opacity-80 xs:-right-10 bg-red-900 p-4 rounded-2xl `}
    background: ${(props) => props.color};
    transform: rotate(-20deg);
    font-size: clamp(4.75rem, 18vw, 5.75rem);
    color: #fff;
    z-index: 1;
  }
  h2 {
    font-size: clamp(1rem, 1.25vw, 1.3rem);
    font-weight: 300;
    color: #888;
    position: relative;
    z-index: 2;
  }
  h1 {
    font-size: clamp(2.25rem, 1.25vw, 1.3rem);
    line-height: 1;
    font-weight: 600;
    position: relative;
    z-index: 2;
    color: ${(props) => props.theme.textColor};
  }
`;
export default Index;
