import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../components/main/Breadcrumb";
import Image from "next/image";
import Loader from "../../components/main/loader";
import ResourceTable from "../../components/resource/ResourceTable";
import SearchInput from "../../components/input/SearchInput";
import { getUniqueResourceType } from "../../hooks/getUniqueData";
import styled from "styled-components";
import { useFetch } from "../../hooks/useFetch";
import { useRouter } from "next/router";
import { useTextFilter } from "../../hooks/useFilter";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]); // all resource use for display
  const { serviceName, resource_type } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);

  const [currentType, setCurrentType] = useState([]); // for display resourceType 
  const [resourceType, setResourceType] = useState([]); // all resourceType

  useEffect(() => {
    setResources(data.filter((value) => value.serviceName === serviceName));
    setResourceType(getUniqueResourceType(data, serviceName));

    // check query sting is includes in resourceType List
    if (getUniqueResourceType(data, serviceName).includes(resource_type)) {
      setCurrentType(resource_type);
    }
  }, [data]);

  const changeType = (typeValue) => {
    if (currentType.includes(typeValue)) {
      const filtered = currentType.filter((value) => value !== typeValue);
      setCurrentType(filtered);
      if (filtered.length === 0) {
        // display all Data
        setResources(data.filter((value) => value.serviceName === serviceName));
      } else {
        // remove selected type
        setResources(data.filter((value) => filtered.includes(value.resourceType)));
      }
    } else {
      // display only selected type 
      setCurrentType([...currentType, typeValue]);
      setResources(data.filter((value) => [...currentType, typeValue].includes(value.resourceType)));
    }
  };
  
  const resourceFilter = (inputValue) => {
    const allData = currentType.length === 0 ? data.filter((value) => value.serviceName === serviceName) : data.filter((value) => currentType.includes(value.resourceType))
    setResources(useTextFilter(allData, inputValue))
  }

  if (loading) {
    return (
      <div className="flex items-center">
        <Loader />
        <h1 className="ml-3">Loading</h1>
      </div>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-8">
          <Image className="rounded" src={`/images/resourceIcon/${serviceName}.png`} alt="service-Img" width={48} height={48} />
          <h1 className="ml-3 capitalize">{serviceName}</h1>
        </div>
        <Grid className="lg:grid-cols-2 md:gap-y-2 gap-3">
          {resourceType.length === 1 ? null : (
            <>
              {resourceType.map((value, index) => (
                <button
                  key={index}
                  className={`flex justify-between items-center p-4 py-3 dynamic-bg shadow-sm rounded ${currentType.includes(value) ? "active" : null}`}
                  onClick={() => changeType(value)}
                >
                  <p className="capitalize text-left">{value}</p>
                  <h2 className="text-xl">{data.filter((value) => value.serviceName === serviceName).filter((item) => item.resourceType === value).length}</h2>
                </button>
              ))}
            </>
          )}
        </Grid>
        <div className="mt-10">
          <SearchInput setState={resourceFilter}/>
        </div>
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
