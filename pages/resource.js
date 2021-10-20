import { Button, CheckBox, TableWrapper } from "../styles/styleComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import fetch from "isomorphic-unfetch";
import { useState } from "react";

export const getServerSideProps = async () => {
  const res = await fetch("https://6bum1uds90.execute-api.ap-southeast-1.amazonaws.com/api/get-resources");
  const data = await res.json();
  const finalData = []
  const serviceCondition = {
    events: "eventbridge"
  }
  Object.keys(data).map((value) => 
  {
    data[value].map((value)=>{
      value.region = value.ResourceARN.split(":")[3]
      value.serviceName = serviceCondition[value.ResourceARN.split(":")[2]] ?? value.ResourceARN.split(":")[2]
      value.resourceType = value.ResourceARN.split(":")[5].split("/")[0]
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
  console.log(process.env.PUBLIC_URL)
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
          {/* <Button className="py-1 px-2 mx-1 md:ml-0 font-light">เรียงโดย</Button>
          <Button className="py-1 px-2 mx-1">
            <FontAwesomeIcon icon="grip-horizontal" size="lg" />
          </Button>
          <Button className="py-1 px-2 mx-1">
            <FontAwesomeIcon icon="list" size="lg" />
          </Button> */}
        </div>
      </div>

      <TableWrapper className="mt-5">
        <table>
          <thead className="sm:hidden">
            <tr>
              <th>
                <CheckBox className={`${isSelectAll ? "checked" : null}`} onClick={() => chooseAllHandle()}>
                  {isSelectAll ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                </CheckBox>
              </th>
              <th>id</th>
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
                  <td className="sm:pr-2">
                    <CheckBox className={`${value.isChoose ? "checked" : null}`} onClick={() => chooseHandle(value)}>
                      {value.isChoose ? <FontAwesomeIcon icon="check" size="1x" color="white" /> : null}
                    </CheckBox>
                  </td>
                  <td className="hidden sm:block">
                    <div className="hidden sm:flex justify-between my-1">
                      <b>Service Name</b>
                      {value.serviceName}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>Resource Type</b>
                      {value.resourceType ? value.resourceType : "-"}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>Region</b>
                      {value.region}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>สร้างเมื่อ</b>
                      -
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>สร้างโดย</b>
                      {value.owner ? value.owner : "-"}
                    </div>
                    <div className="hidden sm:flex justify-between my-1">
                      <b>id</b>
                      {`${value.resourceId.substring(0,10)}${value.resourceId.length > 10 ? "..." : ""}`}
                    </div>
                  </td>
                  <td className="sm:hidden">
                    {`${value.resourceId.substring(0,8)}${value.resourceId.length > 8 ? "..." : ""}`}
                  </td>
                  <td className="flex items-center sm:hidden">
                    <img className="w-9 md:w-7 md:mr-1 mr-2 rounded" src={`/images/resourceIcon/${value.serviceName}.png`} alt="" />
                    <div className="flex flex-col">
                      <p className="text-left font-medium">{value.serviceName}</p> 
                      <p className="text-left text-gray-500">{value.resourceType}</p>
                    </div>
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
