"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [list, setList] = useState([]);
  const [name, setName] = useState("");
  const [dataId, setDataId] = useState("");
  const [create, setCreate] = useState(false);
  const getList = async () => {
    try {
      const res = await axios.get("/api/list");
      if (res.status === 200) {
        setList(res.data.list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const dataCreateBox = () => {
    setDataId("");
    setName("");
    setCreate(true);
  };

  const createBtn = async () => {
    if (name) {
      try {
        const res = await axios.post("/api/create", { name });
        setName("");
        if (res.status === 200) {
          setList(res.data.list);
        }
        setCreate(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const deleteBtn = async (id) => {
    try {
      const res = await axios.post("/api/delete", { id: id });
      if (res.status === 200) {
        setList(res.data.list);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBtn = async (id) => {
    setDataId(id);
    setCreate(true);
    try {
      const res = await axios.post("/api/update-list", { id: id });
      if (res.status === 200) {
        setName(res.data.name.name);
      } else {
        setCreate(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBtnHandling = async (id) => {
    try {
      setDataId(id);

      const res = await axios.post("/api/update", { id: id, name: name });
      if (res.status === 200) {
        if (dataId) {
          setCreate(false);
          setList(res.data.list);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <div className="relative h-screen">
      {create && (
        <div className="bg-black gap-4 absolute bg-opacity-50 z-50 h-full w-full flex-col flex items-center justify-center">
          <div className="bg-white w-1/2 rounded p-5">
            <div className="flex justify-end">
              <button
                className="bg-red-600 rounded px-11 text-white py-1"
                onClick={() => setCreate(false)}
              >
                x
              </button>
            </div>
            <div className="mt-11 ">
              <div className="text-center font-semibold mb-3 text-xl">
                {dataId ? "Update Todo-List" : "Create Todo-List"}
              </div>
              <input
                type="text"
                value={name}
                onChange={(text) => setName(text.target.value)}
                className="border rounded w-full p-2"
              />
              {name === "" && (
                <small className="text-red-500">Name field must be fill</small>
              )}
              {!dataId ? (
                <button
                  onClick={createBtn}
                  className="bg-green-600 rounded w-full mt-9 uppercase text-white py-2"
                >
                  Create
                </button>
              ) : (
                <button
                  onClick={() => updateBtnHandling(dataId)}
                  className="bg-green-600 rounded w-full mt-9 uppercase text-white py-2"
                >
                  update
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end items-end p-3">
        <button
          onClick={dataCreateBox}
          className="bg-violet-600 text-white px-11 py-1 rounded"
        >
          Add
        </button>
      </div>

      <div className="my-9 text-center underline font-bold text-xl">
        Todo-List
      </div>
      {list.map((item) => {
        return (
          <div key={item.id} className="p-2 border">
            <div className="flex justify-between px-5 items-center">
              <div>{item.name}</div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => deleteBtn(item.id)}
                  className="bg-red-600 hover:bg-red-400 rounded px-3 py-1 text-white"
                >
                  delete
                </button>
                <button
                  onClick={() => updateBtn(item.id)}
                  className="bg-blue-600 hover:bg-blue-400 rounded px-3 py-1 text-white"
                >
                  update
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
