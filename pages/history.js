import { Button, TableWrapper } from "../styles/styleComponents";

import fetch from "isomorphic-unfetch";
import { useState } from "react";

export const getStaticProps = async () => {
  // const res = await fetch("http://localhost:3000/api/hello");
  // const data = await res.json();
  return {
    props: {
      resourcesData: [
        {
          id: "1",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 1",
          status: "deleted",
        },
        {
          id: "2",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 2",
          status: "running",
        },
        {
          id: "3",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 3",
          status: "deleted",
        },
        {
          id: "4",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 4",
          status: "running",
        },
      ],
    },
  };
};

const History = ({ resourcesData }) => {
  const [resources, setResources] = useState(resourcesData);
  const filterHandle = (value) => {
    if (value === "") {
      setResources(resourcesData);
    } else {
      setResources(
        resourcesData.filter((item) => {
          return item.createBy.toUpperCase().includes(value.toUpperCase());
        })
      );
    }
  };
  return (
    <>
      <h1>ประวัติ</h1>
      <div className="flex mt-12 md:mt-8 md:flex-col-reverse">
        <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-white-100 font-light" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)}/>
        <div className="flex md:mb-3">
          {/* <Button className="py-1 px-2 mx-1 md:ml-0 font-light">เรียงโดย</Button> */}
        </div>
      </div>
      <TableWrapper className="mt-5">
        <table>
          <thead className="sm:hidden">
            <tr>
              <th>Resource</th>
              <th>Region</th>
              <th>สร้างเมื่อ</th>
              <th>สร้างโดย</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((value, index) => {
              return (
                <tr key={index}>
                  <td className="hidden sm:block">
                    <div className="hidden sm:flex justify-between">
                      <b>Resource</b>
                      {value.name}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>Region</b>
                      {value.region}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>สร้างเมื่อ</b>
                      {value.createAt}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>สร้างโดย</b>
                      {value.createBy}
                    </div>
                    <div className="hidden my-1 sm:flex justify-between ">
                      <b>สถานะ</b>
                      <div className={`text-white w-20 p-0.5 text-center rounded-full ${value.status === "running" ? "bg-green-400" : "bg-gray-400"}`}>
                        {value.status === "running" ? "กำลังรัน" : "ถูกลบแล้ว"}
                      </div>
                    </div>
                  </td>
                  <td className="sm:hidden flex items-center">
                    <img className="w-10 mr-2 rounded" src={`/images/resourceIcon/${value.name}.png`} alt="" />
                    {value.name}
                  </td>
                  <td className="sm:hidden">{value.region}</td>
                  <td className="sm:hidden">{value.createAt}</td>
                  <td className="sm:hidden">{value.createBy}</td>
                  <td className="sm:hidden">
                    <div className={`text-white w-24 text-center rounded-full ${value.status === "running" ? "bg-green-400" : "bg-gray-400"}`}>
                      {value.status === "running" ? "กำลังรัน" : "ถูกลบแล้ว"}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
    </>
  );
};

export default History;
