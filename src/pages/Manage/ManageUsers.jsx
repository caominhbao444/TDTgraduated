import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Button, Image, Input, Table } from "antd";
import { useState } from "react";
import { API_USERS } from "../../fakeApi";
const ManageUsers = () => {
  const [searchText, setSearchText] = useState("");
  const paginationConfig = {
    className: "centered-pagination",
  };
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className="grid grid-cols-1 min-h-screen bg-[#f7f7f7] ">
      <main className="md:col-span-7 flex flex-col md:gap-8 gap-4 md:py-4 mt-[42px] md:mt-[58px] md:px-8">
        <h3 className="text-center md:text-[20px] md:font-bold">
          Quản lý người dùng
        </h3>
        <Input.Search
          placeholder="Nhập thông tin cần tìm..."
          style={{ marginBottom: "20px" }}
          onSearch={(value) => {
            setSearchText(value);
          }}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <Table
          columns={[
            { title: "STT", dataIndex: "id" },
            {
              title: "Họ và tên",
              dataIndex: "fullname",
              filteredValue: [searchText],
              onFilter: (value, record) => {
                return (
                  String(record.fullname)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                  String(record.uesrname)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                  String(record.email)
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                  String(record.country)
                    .toLowerCase()
                    .includes(value.toLowerCase())
                );
              },
            },
            {
              title: "Tên đăng nhập",
              dataIndex: "username",
            },

            {
              title: "Email",
              dataIndex: "email",
            },
            {
              title: "Địa chỉ",
              dataIndex: "country",
            },

            // {
            //   title: "Vai trò",
            //   dataIndex: "role",
            //   render: (role) => {
            //     return role === "owner"
            //       ? "Chủ xe"
            //       : role === "admin"
            //       ? "Người quản lý"
            //       : "Người thuê xe";
            //   },
            // },
            {
              title: "",
              render: (record) => {
                return (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "20px",
                        alignItems: "center",
                      }}
                    >
                      <EditOutlined
                        style={{
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        // onClick={() => onEditCar(record)}
                      />
                      <DeleteOutlined
                        style={{
                          color: "red",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        // onClick={() => onDeleteUser(record)}
                      />
                    </div>
                  </>
                );
              },
            },
          ]}
          dataSource={API_USERS.map((item, index) => ({
            ...item,
            key: index, // or use a unique identifier if available in your data
          }))}
          onChange={onChange}
          locale={{
            triggerDesc: "Giảm dần",
            triggerAsc: "Tăng dần",
            cancelSort: "Hủy",
            emptyText: "Không có dữ liệu",
          }}
          bordered
          pagination={paginationConfig}
        ></Table>
      </main>
    </div>
  );
};

export default ManageUsers;
