import React from 'react'
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";
import toast from 'react-hot-toast';


const DeleteProjectButton = ({ projectId }) => {
    const navigate = useNavigate();

    const [deleteProject] = useMutation(DELETE_PROJECT, {
      variables: { id: projectId },
      onCompleted: () => navigate("/"),
      refetchQueries: [{ query: GET_PROJECTS }],
    });

  return (
    <>
      <Button
        label="Delete"
        onClick={deleteProject}
        className="flex flex-row-reverse gap-1 items-center bg-red-500 text-white rounded-md 2xl:py-2.5"
      />
    </>
  );
}

export default DeleteProjectButton