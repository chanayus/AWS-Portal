import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          isChoose: false,
        },
        {
          id: "2",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 2",
          isChoose: false,
        },
        {
          id: "3",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 3",
          isChoose: false,
        },
        {
          id: "4",
          name: "CloudWatch",
          region: "Europe (London)",
          createAt: "10/4/2021 11:09AM",
          createBy: "IAM User 4",
          isChoose: false,
        },
      ],
    },
  };
};

const Resource = ({ resourcesData }) => {
  const [resources, setResources] = useState(resourcesData);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const chooseHandle = (valueItem) => {
    setResources(
      resources.map((value) => {
        if (valueItem.id === value.id) {
          value.isChoose = !value.isChoose;
        }
        return value;
      })
    );
  };
  const chooseAllHandle = () => {
    setResources(
      resources.map((value) => {
        value.isChoose = !value.isChoose;
        return value;
      })
    );
    setIsSelectAll(!isSelectAll);
  };

  const filterHandle = (value) =>{ 
    if(value === ""){
      setResources(resourcesData)
    }
    else{
      setResources(
        resourcesData.filter((item) => {
          return item.createBy.toUpperCase().includes(value.toUpperCase());
        })
      )
    }
  }
  return (
    <>
      <div className="flex justify-between items-center md:flex-col md:items-start">
        <h1>Resource ที่กำลังใช้งาน</h1>
        <input type="text" className="h-fit p-2 shadow rounded md:w-48 md:self-end md:mt-5" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)}/>
      </div>
      <TableWrapper className="mt-16">
        <table>
          <thead className="sm:hidden">
            <tr>
              <th>
                <button className={`w-6 h-6 sm:w-5 sm:h-5 flex justify-center items-center ${isSelectAll ? "bg-blue-500" : "bg-gray-400"}`} onClick={() => chooseAllHandle()}>
                  {isSelectAll ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                </button>
              </th>
              <th>Resource</th>
              <th>Region</th>
              <th>สร้างเมื่อ</th>
              <th>สร้างโดย</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((value, index) => {
              return (
                <tr key={index}>
                  <td>
                    <button className={`w-6 h-6 sm:w-5 sm:h-5 flex justify-center items-center ${value.isChoose ? "bg-blue-500" : "bg-gray-400"}`} onClick={() => chooseHandle(value)}>
                      {value.isChoose ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                    </button>
                  </td>
                  <td>
                    <p className="sm:text-right">{value.name}</p>
                    <p className="hidden sm:block my-1 text-right">{value.region}</p>
                    <p className="hidden sm:block my-1 text-right">{value.createAt}</p>
                    <p className="hidden sm:block my-1 text-right">{value.createBy}</p>
                  </td>
                  <td className="sm:hidden">{value.region}</td>
                  <td className="sm:hidden">{value.createAt}</td>
                  <td className="sm:hidden">{value.createBy}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
      <div className="flex mt-10 justify-end">
        <button className="bg-red-500 h-12 w-40 text-white flex justify-evenly items-center">
          <FontAwesomeIcon icon="trash" size="lg" color="white"/>
          ลบ Resource
        </button>
      </div>
    </>
  );
};

export default Resource;
