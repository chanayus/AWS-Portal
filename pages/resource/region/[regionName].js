import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../../components/main/Breadcrumb";
import { HiGlobe } from "react-icons/hi";
import Loading from "../../../components/main/loading";
import ResourceTable from "../../../components/resource/ResourceTable";
import { useFetch } from "../../../lib/useFetch";
import { useRouter } from "next/router";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]);
  const { regionName } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);

  useEffect(() => {
    setResources(data.filter((value) => value.region === regionName));
  }, [data]);

  if (loading) {
    return (
      <div className="flex items-center">
        <Loading />
        <h1 className="ml-3">loading</h1>
      </div>
    );
  } else {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
        <Breadcrumb />
        <div className="flex items-center mb-16">
          <div className=" w-12 h-12 rounded-md font-bold bg-gradient-to-r from-green-700 to-green-500 flex items-center justify-center">
            <HiGlobe color="#e1e1e1" size="2.2rem"/>
          </div>
          <h1 className="ml-3 capitalize">{regionName}</h1>
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

export default SpecificResource;
