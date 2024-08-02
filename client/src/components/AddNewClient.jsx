import React, { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import ModalWrapper from '../components/modals/ModalWrapper'
import Textbox from '../components/common/Textbox'
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Toaster, toast } from "react-hot-toast";

const AddNewClient = ({open, setOpen}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("temp");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone, role, status },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: [...clients, addClient],
        },
      });
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }
    addClient(name, email, phone);
    setName("");
    setEmail("");
    setPhone("");
    setRole("");
    setStatus("temp");
    toast.success("Add New Client Complete!");
    window.location.reload();
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={onSubmit}>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            Add New Client
          </DialogTitle>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Full Name"
              type="text"
              name="name"
              label="Full Name:"
              className="w-full rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2 flex flex-col gap-6">
            <Textbox
              placeholder="Email Address"
              type="text"
              name="email"
              label="Email Adress:"
              className="w-full rounded"
              value={email}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </form>
      </ModalWrapper>
      <Toaster />
    </>
  );
};

export default AddNewClient