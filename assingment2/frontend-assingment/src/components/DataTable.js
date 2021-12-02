import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { DatePicker, Radio, Table } from "antd";
import axios from "../utils/ApiService";
import { GET_DATA_URL } from "../utils/config";
import dayjs from "dayjs";
import "../App.js";
const isSameOrAfter = require("dayjs/plugin/isSameOrAfter");
const isYesterday = require("dayjs/plugin/isYesterday");
const isoWeek = require("dayjs/plugin/isoWeek");
const isMonth = require("dayjs/plugin/isoWeeksInYear");
dayjs.extend(isSameOrAfter);
dayjs.extend(isYesterday);
dayjs.extend(isoWeek);
dayjs.extend(isMonth);

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

  //date custom filter
  const handleFilterDate = (date, field) => {
    // data = data["england-and-wales"].events;
    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isSameOrAfter(dayjs(date))) {
        return item;
      }
    });
    setData(filteredData);
  };

  //yesterday date filter
  const onHandleYesterdayFilterDate = (date, field) => {
    // data = data["england-and-wales"].events;

    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isYesterday(dayjs(date))) {
        return item.date;
      }
    });

    setData(filteredData);
  };

  //week date filter
  const onHandleWeekFilterDate = (date, field) => {
    // data = data["england-and-wales"].events;
    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isoWeek(dayjs(date))) {
        return item;
      }
    });

    setData(filteredData);
  };

  //month date filter
  const onHandleMonthFilterDate = (date, field) => {
    // data = data["england-and-wales"].events;
    const filteredData = data.filter((item) => {
      if (field === "from" && dayjs(item.date).isMonth(dayjs(date))) {
        return item;
      }
    });

    setData(filteredData);
  };

  return (
    <div>
      <h1 style={{ fontFamily: "sans-'Brush Script MT', cursive" }}>
        Data Table
      </h1>
      <div id="filters">
        <h2>Filters</h2>
        <Radio onClick={onHandleYesterdayFilterDate}>Yesterday</Radio>
        <Radio onChange={onHandleWeekFilterDate}>Last Week</Radio>
        <Radio onChange={onHandleMonthFilterDate}>Last Month</Radio>
        <DatePicker onChange={handleFilterDate} />
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
