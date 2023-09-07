/* eslint-disable react/prop-types */
import { BsTrash } from "react-icons/bs";
import AddIUCN from "./AddIUCN";
import SelectYear from "./AddYear";

function AddComponentIUCN({ onDelete }) {
  const handleDelete = () => {
    onDelete();
  };
  return (
    <div className="row mb-3">
      <div className="col-5 m-0">
        <SelectYear />
      </div>
      <div className="col-5">
        <AddIUCN />
      </div>
      <button
        onClick={handleDelete}
        className="delete__component col-2 text-danger fs-4"
      >
        <BsTrash className="fs-4" />
      </button>
    </div>
  );
}

export default AddComponentIUCN;
