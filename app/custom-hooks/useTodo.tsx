import { useState, useEffect } from "react";

import { addDoc, collection } from "firebase/firestore";
import db from "../config/dbSetup";
import { getDocs } from "firebase/firestore";
import TodoType from "../types/todotypes";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export default function useTodoLogical() {
  const [userInput, setTask] = useState<string>("");
  const [isTrue, setIsTrue] = useState(false);
  const [fullTask, setFullTask] = useState<TodoType[]>([]);
  const [isUpdate, setIsUpdate] = useState(false);
  const [newItem, setNewItem] = useState();
  const [search, setSearch] = useState(``);
  const [searchResult, setSearchResult] = useState<TodoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const task1: TodoType = {
    task: userInput,
    date:
      new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
  };
  useEffect(() => {
    getDataFromDb();
  }, []);
  async function taskFunction() {
    try {
      if (userInput != "") {
        setFullTask([task1, ...fullTask]);
        setIsTrue(false);
      } else {
        setIsTrue(true);
      }
      setTask("");

      const docRef = await addDoc(collection(db, "FullTask"), {
        task: userInput,
        date:
          new Date().toLocaleDateString() +
          " " +
          new Date().toLocaleTimeString(),
      });
    } catch (error) {
      console.log("add document error", error);
    }
  }

  const getDataFromDb = async () => {
    setIsLoading(true);
    const querySnapshot = await getDocs(collection(db, "FullTask"));
    const dbData: any = [];
    querySnapshot.forEach((doc) => {
      console.log(` ${doc.data().task}`);
      console.log("id taken from firebase", doc.id);

      dbData.push({ task: doc.data().task, date: doc.data().date, id: doc.id });

      console.log(dbData);
      setFullTask(dbData);
      setIsLoading(false);
    });
  };

  async function Delete(itemId: any) {
    try {
      const newTask = fullTask.filter((item: any) => item.id != itemId);
      console.log(newTask);
      setFullTask(newTask);

      const deletedItemData = await deleteDoc(doc(db, "FullTask", itemId));
      console.log("deletedItemData", deletedItemData);
    } catch (error) {
      console.log("delete error", error);
    }
  }

  const updateHandler = (item: any, index: number) => {
    setTask(item);
    // setNewItem(index);
    setIsUpdate(true);
  };

  const editHandler = async () => {
    try {
      const updatevariable = doc(db, "Todo", `${newItem}`);
      await updateDoc(updatevariable, {
        task: userInput,
      });
      const newArray = fullTask.map((item, index) => {
        if (newItem == index) {
          const updatedTodo: TodoType = {
            task: userInput,
            date:
              new Date().toLocaleDateString() +
              " " +
              new Date().toLocaleTimeString(),
          };
          return updatedTodo;
        } else {
          return item;
        }
      });
      setFullTask(newArray);
      setIsUpdate(false);
      setTask("");
    } catch (e) {
      console.log(`Updating error ${e}`);
    }
  };
  const cancelhandler = () => {
    setTask("");
    setIsUpdate(false);
  };
  const searchhandler = () => {
    const searchedTask = fullTask.filter((param2) =>
      param2.task.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResult(searchedTask);
  };
  const handleSearchInputChange = (e: any) => {
    setSearch(e.target.value);
    searchhandler();
  };
  return {
    userInput,
    isTrue,
    fullTask,
    isUpdate,
    newItem,
    search,
    searchResult,
    task1,
    taskFunction,
    Delete,
    updateHandler,
    editHandler,
    cancelhandler,
    searchhandler,
    handleSearchInputChange,
    setTask,
    getDataFromDb,
    isLoading,
    setIsLoading,
  };
}
