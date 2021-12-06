import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../components/main/Breadcrumb";
import Image from "next/image";
import Loading from "../../components/main/loading";
import ResourceTable from "../../components/resource/ResourceTable";
import { getUniqueResourceType } from "../../lib/getUniqueData";
import styled from "styled-components";
import { useFetch } from "../../lib/useFetch";
import { useRouter } from "next/router";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]);
  const { serviceName, resource_type } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);
  const [currentType, setCurrentType] = useState();
  const [resourceType, setResourceType] = useState([]);

  useEffect(() => {
    setResources(data.filter((value) => value.serviceName === serviceName));
    setResourceType(getUniqueResourceType(data, serviceName));

    // check query sting is includes in resourceType List
    if(getUniqueResourceType(data, serviceName).includes(resource_type)){
      setCurrentType(resource_type)
    }
    else{
      setCurrentType("all")
    }
   
  }, [data]);

  const changeType = (typeValue) => {
    if (typeValue === "all") {
      setResources(data.filter((value) => value.serviceName === serviceName));
    } else {
      setResources(data.filter((value) => value.resourceType === typeValue));
    }
    setCurrentType(typeValue);
  };

  if (loading) {
    return (
      <div className="flex items-center">
        <Loading />
        <h1 className="ml-3">Loading</h1>
      </div>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-8">
          <Image className="rounded" src={`/images/resourceIcon/${serviceName}.png`} alt="service-Img" width={50} height={50} />
          <h1 className="ml-3 capitalize">{serviceName}</h1>
        </div>
        <Grid className="lg:grid-cols-2 md:gap-y-2 gap-3">
          {resourceType.length === 1 ? null : (
            <>
              <button className={`flex justify-between items-center p-4 py-3 dynamic-bg shadow rounded-sm ${currentType === "all" ? "active" : null}`} onClick={() => changeType("all")}>
                <p className="font-semibold">ทั้งหมด</p>
                <h2 className="text-xl">{data.filter((value) => value.serviceName === serviceName).length}</h2>
              </button>
              {resourceType.map((value, index) => (
                <button key={index} className={`flex justify-between items-center p-4 py-3 dynamic-bg shadow rounded-sm ${currentType === value ? "active" : null}`} onClick={() => changeType(value)}>
                  <p className="capitalize text-left">{value}</p>
                  <h2 className="text-xl">{data.filter((value) => value.serviceName === serviceName).filter((item) => item.resourceType === value).length}</h2>
                </button>
              ))}
            </>
          )}
        </Grid>
        <AnimatePresence exitBeforeEnter>
          <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }} key={"table"}>
            <ResourceTable resources={resources} setResources={setResources} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  }
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
  .active {
    transition: 0.25s;
    box-shadow: 0 0 3px 2px ${(props) => props.theme.blue};
  }
`;

export default SpecificResource;
