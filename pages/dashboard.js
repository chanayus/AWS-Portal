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
            <h2>IAM ที่กำลังใช้ Resource</h2>
            <h1>255</h1>
          </div>
        </DataCard>
        <DataCard color="#8C9CEE">
          <FontAwesomeIcon icon="money-bill" size="4x" className="mr-4" />
          <div>
            <h2>IAM ที่กำลังใช้ Resource</h2>
            <h1>255</h1>
          </div>
        </DataCard>
        <DataCard color="#8C9CEE">
          <FontAwesomeIcon icon="money-bill" size="4x" className="mr-4" />
          <div>
            <h2>IAM ที่กำลังใช้ Resource</h2>
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
  ${tw`flex justify-evenly items-center rounded mr-0 mt-5 md:mr-0 p-5 lg:p-3`}
  background: linear-gradient(101.2deg, #1f1f1f 22.98%, #6A6A6A 92.57%);
  height: 150px;
  border-bottom: 10px solid ${(props) => props.color};
  color: #fff !important;
  svg{
    ${tw`block sm:hidden`}
    font-size: clamp(2.8rem,1.3vw, 3.1rem);
  }
  h2 {
    font-size: clamp(1rem,1.5vw,1.3rem);
    font-weight: 300;
    color: #fff;
  }
  h1 {
    font-size: clamp(2.5rem,2vw,1.3rem);
    line-height: 1;
    font-weight: 600;
    color: #fff;
  }
`;

export default Dashboard;
