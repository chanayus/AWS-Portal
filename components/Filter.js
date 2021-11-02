import { AnimatePresence } from "framer-motion";
import { Div } from "../styles/styleComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Filter = () => {
  const [visible, setVisible] = useState(false);
  const toggle = () => {
    setVisible(!visible);
  };
  return (
    <>
      <button onClick={() => toggle()}>
        <FontAwesomeIcon icon="filter" size="1x" color="white" />
      </button>
      <AnimatePresence>
        {visible ? (
          <Div className="fixed w-1/5 xl:w-1/4 sm:w-1/2 right-0 top-0 bg-white h-screen p-5" initial={{ x: 300 }} animate={{ x: 0 }} exit={{ x: 300 }} transition={{ duration: 0.2 }}>
            <div>
              <div className="flex justify-between items-center mb-8">
                <h1>Filter</h1>
                <button onClick={() => toggle()}>
                  <FontAwesomeIcon icon="times" size="lg" color="gray" />
                </button>
              </div>
              <label htmlFor="">Resource</label>
              <select name="cars" id="cars" className="w-full mb-6">
                <option value="volvo">All</option>
                <option value="volvo">EC2</option>
                <option value="saab">eventbridge</option>
                <option value="mercedes">rds</option>
                <option value="audi">cloudwatch</option>
              </select>
              <label htmlFor="">IAM</label>
              <select name="cars" id="cars" className="w-full mb-6">
                <option value="volvo">All</option>
                <option value="volvo">SLRManagement</option>
                <option value="saab">etl_proj2021</option>
                <option value="mercedes">AutoScaling</option>
                <option value="audi">resource-project2021</option>
              </select>
            </div>
          </Div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Filter;
