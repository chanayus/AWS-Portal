import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import tw from "twin.macro";
import { useState } from "react";

const Dashboard = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  return (
    <>
      <h1 className="font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-8 xl:gap-3 lg:grid-cols-2  mt-6">
        <DataCard color="#98E2A4">
          <FontAwesomeIcon icon="user" size="4x" className="mr-4" />
          <div>
            <h2>IAM ที่กำลังใช้ Resource</h2>
            <h1>255</h1>
          </div>
        </DataCard>
        <DataCard color="#F49292">
          <FontAwesomeIcon icon="users" size="4x" className="mr-4" />
          <div>
            <h2>IAM ทั้งหมด</h2>
            <h1>255</h1>
          </div>
        </DataCard>
        <DataCard color="#8C9CEE">
          <FontAwesomeIcon icon="money-check-alt" size="4x" className="mr-4" />
          <div>
            <h2>ค่าใช้จ่าย</h2>
            <h1>255</h1>
          </div>
        </DataCard>
        <DataCard color="#ebb96f">
          <FontAwesomeIcon icon="server" size="4x" className="mr-4" />
          <div>
            <h2>Resource ที่กำลังใช้งาน</h2>
            <h1>255</h1>
          </div>
        </DataCard>
      </div>
      <div className="flex justify-between mt-20 gap-10 lg:flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-lg">Resource ในแต่ละ Region</h2>
            <button className="text-white bg-black px-3 py-2 rounded md:text-xs">ดูทั้งหมด</button>
          </div>
          <div className="bg-white p-6 mt-5 rounded md:flex-none md:w-full">
            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>จำนวน Resource</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vergina</td>
                  <td>1024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex-1 lg:mt-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-lg">Resource ที่ถูกสร้างล่าสุด</h2>
            <button className="text-white bg-black px-3 py-2 rounded md:text-xs">ดูทั้งหมด</button>
          </div>
          <div className="bg-white p-6 mt-5 rounded md:flex-none md:w-full">
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
          </div>
        </div>
      </div>
    </>
  );
};

const DataCard = styled.div`
  ${tw`flex justify-center flex-col rounded pl-5 mt-5 md:px-6 md:mr-0 relative overflow-hidden`}
  background: ${(props) => props.color};
  height: 150px;
  color: #111 !important;
  svg{
    ${tw`opacity-40 absolute -bottom-2 -right-2 block sm:hidden`}
    font-size: clamp(4.8rem,7vw, 6rem);
  }
  h2 {
    font-size: clamp(1rem,1.5vw,1.3rem);
    font-weight: 300;
    color: #111;
  }
  h1 {
    font-size: clamp(2.5rem,2vw,1.3rem);
    line-height: 1;
    font-weight: 600;
    color: #111;
  }
`;

export default Dashboard;
