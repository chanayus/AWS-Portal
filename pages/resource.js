import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const getStaticProps = async () => {
  // const res = await fetch("http://localhost:3000/api/hello");
  // const data = await res.json();
  return {
    props: { resourcesData: 
      [
        { 
          id: "1",
          name: 'CloudWatch' ,
          region: 'Europe (London)',
          createAt: '10/4/2021 11:09AM',
          createBy: 'IAM User 1',
          isChoose: false
        },
        { 
          id: "2",
          name: 'CloudWatch' ,
          region: 'Europe (London)',
          createAt: '10/4/2021 11:09AM',
          createBy: 'IAM User 2',
          isChoose: false
        },
        { 
          id: "3",
          name: 'CloudWatch' ,
          region: 'Europe (London)',
          createAt: '10/4/2021 11:09AM',
          createBy: 'IAM User 3',
          isChoose: false
        },
        { 
          id: "4",
          name: 'CloudWatch' ,
          region: 'Europe (London)',
          createAt: '10/4/2021 11:09AM',
          createBy: 'IAM User 4',
          isChoose: false
        },      
     ]
    },
  };
};

const Resource = ({ resourcesData }) => {
  const [ resources, setResources ] = useState(resourcesData)
  const [ isSelectAll, setIsSelectAll ] = useState(false)
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
    setIsSelectAll(!isSelectAll)
	};
  return (
    <>
      <h1 className="font-bold">Resource ที่กำลังใช้งาน</h1>
      <table className="mt-20">
        <thead>
          <tr>
            <th>
                <button className={`w-6 h-6 sm:w-5 sm:h-5 flex justify-center items-center ${isSelectAll ? "bg-blue-500":"bg-gray-400"}`} onClick={() => chooseAllHandle()}>                  
                    {
                      isSelectAll ? <FontAwesomeIcon icon="check" size="1x" color="white" />  : null
                    }     
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
                  <button className={`w-6 h-6 sm:w-5 sm:h-5 flex justify-center items-center ${value.isChoose ? "bg-blue-500":"bg-gray-400"}`} onClick={() => chooseHandle(value) }>
                    {
                        value.isChoose ?  <FontAwesomeIcon icon="check" size="1x" color="white" /> : null
                    }         
                  </button>
                </td>
                <td>{value.name}</td>
                <td>{value.region}</td>
                <td>{value.createAt}</td>
                <td>{value.createBy}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  );
};

export default Resource;
