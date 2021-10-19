import { Button, TableWrapper } from "../styles/styleComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetch from "isomorphic-unfetch";
import { useState } from "react";

export const getStaticProps = async () => {
  const res = await fetch("https://6bum1uds90.execute-api.ap-southeast-1.amazonaws.com/api/get-resources");
  const data = await res.json();
  const finalData = []
  Object.keys(data).map((value) => 
  {
    data[value].map((value, index)=>{
      value.region = value.ResourceARN.split(":")[3]
      value.resourceName = value.ResourceARN.split(":")[2]
      value.Tags.map((tagValue) => {
        if(tagValue.Key === "owner"){
          value.owner = tagValue.Value
        }
      })
      value.isChoose = false,
      finalData.push(value)
    })
  })
  return {
    props: {
      resourcesData: finalData,
    },
  };
};

const Resource = ({ resourcesData }) => {
  const [resources, setResources] = useState(resourcesData);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const chooseHandle = (valueItem) => {
    setResources(
      resources.map((value) => {
        if (valueItem.resourceId === value.resourceId) {
          value.isChoose = !value.isChoose;
        }
        return value;
      })
    );
  };
  const chooseAllHandle = () => {
    setResources(
      resources.map((value) => {
        value.isChoose = isSelectAll ? false : true;
        return value;
      })
    );
    setIsSelectAll(!isSelectAll);
  };

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
      <h1>Resource ที่กำลังใช้งาน</h1>

      <div className="flex mt-12 md:mt-8 md:flex-col-reverse">
        <input type="text" className="h-fit py-1 px-2 mr-1 rounded md:w-full bg-white-100 font-light" placeholder="ค้นหาชื่อ resource" onChange={(e) => filterHandle(e.target.value)} />
        <div className="flex md:mb-3">
          <Button className="py-1 px-2 mx-1 md:ml-0 font-light">เรียงโดย</Button>
          <Button className="py-1 px-2 mx-1">
            <FontAwesomeIcon icon="grip-horizontal" size="lg" />
          </Button>
          <Button className="py-1 px-2 mx-1">
            <FontAwesomeIcon icon="list" size="lg" />
          </Button>
        </div>
      </div>
      <TableWrapper className="mt-5">
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
                    <p className="sm:text-right">{value.resourceName}</p>
                    <p className="hidden sm:block my-1 text-right">{value.region}</p>
                    <p className="hidden sm:block my-1 text-right">-</p>
                    <p className="hidden sm:block my-1 text-right">{value.owner ? value.owner : "-"}</p>
                  </td>
                  <td className="sm:hidden">{value.region}</td>
                  <td className="sm:hidden">-</td>
                  <td className="sm:hidden">{value.owner ? value.owner : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableWrapper>
      <div className="flex mt-10 justify-end">
        <button className="bg-red-500 h-12 w-40 text-white flex justify-evenly items-center">
          <FontAwesomeIcon icon="trash" size="lg" color="white" />
          ลบ Resource
        </button>
      </div>
    </>
  );
};

export default Resource;
