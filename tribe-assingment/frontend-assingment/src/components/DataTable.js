import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { DatePicker, Radio, Table } from "antd";
import axios from "../utils/ApiService";
import { GET_DATA_URL } from "../utils/config";
import "../App.js"

const originData = [];

const DataTable = () => {
  let [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);

  //fetching users data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let { data: dataList } = await axios.get(GET_DATA_URL);
        dataList = dataList["england-and-wales"].events;
        dataList = dataList.map((item) => {
          var temp = Object.assign({}, item);
          temp.key = item.title;
          return temp;
        });
        setData(dataList);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    };
    fetchData();
  }, []);

  //pagination
  const cancel = () => {
    setEditingKey("");
  };

  //columns
  const columns = [
    {
      title: "Upcoming Bank Holidays",
      dataIndex: "title",
      width: "40%",
      editable: true,
    },
    {
      title: "Dates",
      dataIndex: "date",
      width: "40%",
      editable: true,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      width: "40%",
      editable: true,
    },
  ];

  //date filter

  return (
    <div>
      <h1 style={{ fontFamily: "sans-'Brush Script MT', cursive" }}>
        Data Table
      </h1>
      <div id="filters">
        <h2>Filters</h2>
        <Radio>Yesterday</Radio>
        <Radio>Last Week</Radio>
        <Radio>Last Month</Radio>
        <DatePicker onChange={""} />
      </div>
      <Table
        bordered
        dataSource={data}
        columns={columns}
        pagination={{
          onChange: cancel,
        }}
      />
    </div>
  );
};

export default DataTable;
