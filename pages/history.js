import { TableWrapper } from "../styles/styleComponents";
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
      <div className="flex justify-between items-center md:flex-col md:items-start">
        <h1>ประวัติ</h1>
        <input type="text" className="h-fit p-2 shadow rounded md:w-48 md:self-end md:mt-5" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)} />
      </div>
      <TableWrapper className="mt-16">
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
                      <div className={`text-white border w-24 ${value.status === "running" ? "bg-green-500 border-green-800" : "bg-gray-400 border-gray-500"}`}>
                        {value.status === "running" ? "กำลังรัน" : "ถูกลบแล้ว"}
                      </div>
                    </div>
                  </td>
                  <td className="sm:hidden">{value.name}</td>
                  <td className="sm:hidden">{value.region}</td>
                  <td className="sm:hidden">{value.createAt}</td>
                  <td className="sm:hidden">{value.createBy}</td>
                  <td className="sm:hidden">
                    <div className={`text-white border w-24 mx-auto ${value.status === "running" ? "bg-green-500 border-green-800" : "bg-gray-400 border-gray-500"}`}>
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
