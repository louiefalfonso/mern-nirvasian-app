import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../queries/orderQueries";
import { GET_CLIENTS } from "../queries/clientQueries";
import Spinner from "./Spinner";

const OrderCards = () => {
  return (
    <>
    <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className="flex flex-1 gap-1 items-center text-sm font-medium">
              cards
          </div>
        </div>
      </div>  
    </>
  )
}

export default OrderCards