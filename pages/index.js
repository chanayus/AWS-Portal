import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";
import tw from "twin.macro";

export const getStaticProps = async () => {
  const res = await fetch("https://6bum1uds90.execute-api.ap-southeast-1.amazonaws.com/api/get-resources");
  const data = await res.json();
  let regionList = data.filter((value) => value.ResourceARN.split(":")[3] !== "").map((value) => value.ResourceARN.split(":")[3])
  return {
    props: {regionList: duplicateCount(regionList)}
  };
};

const duplicateCount = (data) =>{
  const unique = [...new Set(data)];
  const result = unique.map(value => [value, data.filter(str => str === value).length]);
  return result
} // count duplicate value in array 

const Index = ({ regionList }) => {
  return (
    <>
      <h1 className="font-bold">Dashboard</h1>
      <div className="grid grid-cols-4 gap-8 xl:gap-3 lg:grid-cols-2  mt-6">
        <Link href="/">
          <DataCard color="#98E2A4">
            <FontAwesomeIcon icon="user" size="4x" className="mr-4" />
            <div>
              <h2>IAM ที่กำลังใช้ Resource</h2>
              <h1>255</h1>
            </div>
          </DataCard>
        </Link>
        <Link href="">
          <DataCard color="#F49292">
            <FontAwesomeIcon icon="users" size="4x" className="mr-4" />
            <div>
              <h2>IAM ทั้งหมด</h2>
              <h1>255</h1>
            </div>
          </DataCard>
        </Link>
        <Link href="">
          <DataCard color="#8C9CEE">
            <FontAwesomeIcon
              icon="money-check-alt"
              size="4x"
              className="mr-4"
            />
            <div>
              <h2>ค่าใช้จ่าย</h2>
              <h1>255</h1>
            </div>
          </DataCard>
        </Link>
        <Link href="/runningResource">
          <DataCard color="#ebb96f">
            <FontAwesomeIcon icon="server" size="4x" className="mr-4" />
            <div>
              <h2>Resource ที่กำลังใช้งาน</h2>
              <h1>255</h1>
            </div>
          </DataCard>
        </Link>
      </div>
      <div className="flex justify-between mt-20 gap-10 lg:flex-col">
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-lg">Resource ในแต่ละ Region</h2>
            <button className="text-white bg-black px-3 py-2 rounded md:text-xs">
              ดูทั้งหมด
            </button>
          </div>
          <TableWrapper className="bg-white p-6 mt-5 rounded md:flex-none md:w-full">
            <table>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>จำนวน Resource</th>
                </tr>
              </thead>
              <tbody>
                {regionList.map((value, index) => (
                  <tr key={index}>
                    <td>{value[0]}</td>
                    <td>{value[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableWrapper>
        </div>
        <div className="flex-1 lg:mt-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl md:text-lg">Resource ที่ถูกสร้างล่าสุด</h2>
            <button className="text-white bg-black px-3 py-2 rounded md:text-xs">
              ดูทั้งหมด
            </button>
          </div>
          <TableWrapper className="bg-white p-6 mt-5 rounded md:flex-none md:w-full">
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

const DataCard = styled.a`
  ${tw`flex justify-center flex-col rounded pl-5 md:px-4 md:mr-0 relative overflow-hidden`}
  background: ${(props) => props.color};
  height: 140px;
  color: #111 !important;
  cursor: pointer;
  svg {
    ${tw`opacity-30 absolute -bottom-2 -right-2 block sm:-right-5`}
    font-size: clamp(4.8rem,7vw, 6rem);
  }
  h2 {
    font-size: clamp(1rem, 1.25vw, 1.3rem);
    font-weight: 300;
    color: #111;
  }
  h1 {
    font-size: clamp(2.25rem, 1.25vw, 1.3rem);
    line-height: 1;
    font-weight: 600;
    color: #111;
  }
`;

const TableWrapper = styled.div`
  background: ${(props) => props.theme.subColor};
`;

export default Index;
