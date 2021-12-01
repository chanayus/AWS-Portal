import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import Breadcrumb from "../../components/main/Breadcrumb";
import Image from "next/image";
import Loading from "../../components/main/loading";
import ResourceTable from "../../components/resource/ResourceTable";
import { useFetch } from "../../lib/useFetch";
import { useRouter } from "next/router";

const SpecificResource = () => {
  const router = useRouter();
  const [resources, setResources] = useState([]);
  const { serviceName } = router.query;
  const { loading, data } = useFetch("/api/resources", setResources, true);

  useEffect(() => {
    setResources(data.filter((value) => value.serviceName === serviceName));
  }, [data]);

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
        <Breadcrumb/>
        <div className="flex items-center mb-16">
          <Image className="rounded" src={`/images/resourceIcon/${serviceName}.png`} alt="service-Img" width={50} height={50} />
          <h1 className="ml-3 capitalize">{serviceName}</h1>
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
